import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';
import { RESTAURANT_NOT_FOUND } from '../../assets/messages';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {
  constructor(private readonly dataSource: DataSource) {
    super(Restaurant, dataSource.createEntityManager());
  }

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const { name, rating, location } = createRestaurantDto;
    const restaurant = this.create({ name, rating, location });
    return this.save(restaurant);
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.find();
  }

  async getRestaurantById(id: number): Promise<Restaurant | undefined> {
    return this.findOne({ where: { id } });
  }

  async updateRestaurant(
    id: number,
    updateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant | undefined> {
    const result = await this.update(id, updateRestaurantDto);

    if (result.affected === 0) {
      return undefined;
    }

    return this.getRestaurantById(id);
  }

  async deleteRestaurant(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(RESTAURANT_NOT_FOUND(id));
    }
  }
}
