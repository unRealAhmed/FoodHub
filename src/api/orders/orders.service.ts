import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { DeepPartial } from 'typeorm';
import { UserService } from '../users/user.service';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.createOrder(createOrderDto);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getAllOrders();
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.getOrder(id);
    if (!order) {
      throw new NotFoundException(`Order with ${id} not found`);
    }
    return order;
  }

  async cancelOrderByUser(
    id: number,
    userId: number,
  ): Promise<{
    message: string;
  }> {
    return (await this.orderRepository.cancelOrderByUser(id, userId))
      ? {
          message: 'Canclled Order',
        }
      : {
          message: 'Failed to cancel Order',
        };
  }

  async cancelOrderByRestaurant(
    id: number,
    restaurantName: string,
  ): Promise<String> {
    const IsRestaurantExist =
      await this.restaurantService.getRestaurantByName(restaurantName);

    if (!IsRestaurantExist) {
      throw new NotFoundException(
        `Restaurant With ${restaurantName} name NOT exists`,
      );
    }

    return this.orderRepository.cancelOrderByRestaurant(id);
  }
}
