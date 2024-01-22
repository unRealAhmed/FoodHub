import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Post()
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: number): Promise<void> {
    return this.restaurantsService.deleteRestaurant(id);
  }
}
