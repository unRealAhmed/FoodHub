import { DataSource, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './orders.entity';
import { ItemsRepository } from '../items/items.repository';
import {
  ORDER_CANCELLED_BY_USER,
  ORDER_CANCELLED_BY_RESTAURANT,
} from 'src/common/assets/messages';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly itemsRepository: ItemsRepository,
  ) {
    super(Order, dataSource.createEntityManager());
  }

  async createOrder(
    order: Partial<Omit<Order, 'items'>> & {
      items: number[];
    },
  ): Promise<Order> {
    const items = await this.itemsRepository.getItemsByIds(order.items);

    if (items.length < order.items.length) {
      throw new BadRequestException('Bad Id sent');
    }

    order.totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const toCreate = this.create({
      ...order,
      items,
    });

    return this.save(toCreate);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.find({
      relations: {
        items: true,
        user: true,
      },
    });
  }

  async getOrder(id: number): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: {
        items: true,
        user: true,
      },
    });
  }

  async cancelOrderByUser(id: number, user: number): Promise<boolean> {
    const isOrderExist = await this.getOrder(id);

    if (!isOrderExist) {
      throw new NotFoundException(`Order not found`);
    }
    const checkUserRelatedToOrder = await this.find({
      where: {
        id,
        user: {
          id: user,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!checkUserRelatedToOrder) {
      throw new NotFoundException(`user order not found`);
    }
    isOrderExist.status = ORDER_CANCELLED_BY_USER;
    this.update(id, {
      status: ORDER_CANCELLED_BY_USER,
    });

    return true;
  }

  async cancelOrderByRestaurant(id: number): Promise<string> {
    const isOrderExist = await this.getOrder(id);

    if (!isOrderExist) {
      throw new NotFoundException(`Order with ${id} not found`);
    }

    isOrderExist.status = ORDER_CANCELLED_BY_RESTAURANT;
    this.save(isOrderExist);

    return 'order cancelled successfully';
  }
}
