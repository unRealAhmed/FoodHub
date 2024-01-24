import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RESTAURANT_NOT_FOUND } from '../../assets/messages';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantRepository.createRestaurant(createRestaurantDto);
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.getAllRestaurants();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(RESTAURANT_NOT_FOUND(id));
    }
    return restaurant;
  }

  async updateRestaurant(
    id: number,
    updateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantRepository.updateRestaurant(
      id,
      updateRestaurantDto,
    );

    if (!updatedRestaurant) {
      throw new NotFoundException(RESTAURANT_NOT_FOUND(id));
    }

    return updatedRestaurant;
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.restaurantRepository.deleteRestaurant(id);
  }
}
