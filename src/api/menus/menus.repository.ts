import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { Menu } from './menus.entity';
import { MENU_NOT_FOUND } from 'src/common/assets/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';

@Injectable()
export class MenusRepository extends Repository<Menu> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {
    super(Menu, dataSource.createEntityManager());
  }

  async createMenu(menu: CreateMenuDto): Promise<Menu> {
    const { restaurantId } = menu;

    const existingRestaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });

    if (!existingRestaurant) {
      throw new NotFoundException(
        `Restaurant with id ${restaurantId} not found.`,
      );
    }

    const newMenu = this.create({
      name: menu.name,
      description: menu.description,
      restaurant: existingRestaurant,
    });

    return this.save(newMenu);
  }

  async getAllMenus(): Promise<Menu[]> {
    return this.find();
  }

  async getMenuById(id: number): Promise<Menu | null> {
    return this.createQueryBuilder('menu')
      .leftJoinAndSelect('menu.restaurant', 'restaurant')
      .where('menu.id = :id', { id })
      .getOne();
  }

  async updateMenu(id: number, menu: UpdateMenuDto): Promise<Menu | null> {
    const result = await this.createQueryBuilder()
      .update(Menu)
      .set({ ...menu })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0] || null;
  }

  async deleteMenu(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(MENU_NOT_FOUND(id));
    }
  }
}
