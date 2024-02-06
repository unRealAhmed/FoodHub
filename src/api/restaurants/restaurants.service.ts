import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RESTAURANT_NOT_FOUND } from '../../common/assets/messages';
import { Pagination } from 'src/types/pagination.interface';
import { PaginatedDto } from 'src/types/paginated.dto';
import {
  filterRestaurants,
  RestaurantSearchCriteria,
} from 'src/helpers/filter';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantRepository.createRestaurant(createRestaurantDto);
  }

  async getAllRestaurants(
    paginationParams: Pagination,
    searchCriteria: RestaurantSearchCriteria = {},
  ): Promise<PaginatedDto<Restaurant>> {
    const { page, limit } = paginationParams;

    const [items, total] = await this.restaurantRepository.findAndCount();

    const filteredRestaurants = filterRestaurants(items, searchCriteria);

    const paginatedRestaurants = filteredRestaurants.slice(
      (page - 1) * limit,
      page * limit,
    );

    return {
      total: filteredRestaurants.length,
      pages: Math.ceil(filteredRestaurants.length / limit),
      items: paginatedRestaurants,
    };
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
