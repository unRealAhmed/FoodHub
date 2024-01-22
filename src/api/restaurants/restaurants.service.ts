import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantRepository } from './restaurant.repository';
import { validate } from 'class-validator';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  private async validateDto(dto: CreateRestaurantDto): Promise<void> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    await this.validateDto(createRestaurantDto);
    return await this.restaurantRepository.createRestaurant(
      createRestaurantDto,
    );
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.getAllRestaurants();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return restaurant;
  }

  async updateRestaurant(
    id: number,
    updateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    await this.validateDto(updateRestaurantDto);
    const updatedRestaurant = await this.restaurantRepository.updateRestaurant(
      id,
      updateRestaurantDto,
    );
    if (!updatedRestaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return updatedRestaurant;
  }

  async deleteRestaurant(id: number): Promise<void> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    await this.restaurantRepository.deleteRestaurant(id);
  }
}
