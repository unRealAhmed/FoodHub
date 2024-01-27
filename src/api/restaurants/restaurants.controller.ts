import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';

import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new restaurant',
    description: 'Endpoint to create a new restaurant.',
  })
  @ApiBody({
    type: CreateRestaurantDto,
    examples: {
      example: {
        value: {
          name: 'Delicious Delights',
          rating: 4.5,
          location: '123 Main Street, Cityville',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Restaurant created successfully.',
    type: Restaurant,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
  })
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all restaurants',
    description: 'Endpoint to retrieve a list of all restaurants.',
  })
  @ApiOkResponse({
    description: 'List of all restaurants.',
    type: Restaurant,
    isArray: true,
  })
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.getAllRestaurants();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a restaurant by ID',
    description: 'Endpoint to retrieve a restaurant by its ID.',
  })
  @ApiOkResponse({
    description: 'Restaurant found.',
    type: Restaurant,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async getRestaurantById(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a restaurant by ID',
    description: 'Endpoint to update a restaurant by its ID.',
  })
  @ApiBody({
    type: CreateRestaurantDto,
    examples: {
      example: {
        value: {
          name: 'Updated Delights',
          rating: 4.8,
          location: '456 Main Street, Cityville',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Restaurant updated successfully.',
    type: Restaurant,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a restaurant by ID',
    description: 'Endpoint to delete a restaurant by its ID.',
  })
  @ApiOkResponse({
    description: 'Restaurant deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async deleteRestaurant(@Param('id') id: number): Promise<void> {
    return this.restaurantsService.deleteRestaurant(id);
  }
}
