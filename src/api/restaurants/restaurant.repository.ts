import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {
  constructor(private readonly dataSource: DataSource) {
    super(Restaurant, dataSource.createEntityManager());
  }

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const { name, rating, location } = createRestaurantDto;
    return this.save({ name, rating, location });
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
    await this.save({ id, ...updateRestaurantDto });
    return this.getRestaurantById(id);
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.delete(id);
  }
}
