import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/types/paginated.dto';
import { IFilterRestaurant } from './dtos/filter-restaurants.dto';
import {
  RESTAURANT_CREATED_SUCCESSFULLY,
  LIST_OF_ALL_RESTAURANTS,
  RESTAURANT_FOUND,
  RESTAURANT_UPDATED_SUCCESSFULLY,
  RESTAURANT_DELETED_SUCCESSFULLY,
} from 'src/common/assets/messages';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new restaurant',
    description: 'create a new restaurant.',
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
    status: HttpStatus.CREATED,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
    status: HttpStatus.BAD_REQUEST,
  })
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<{ message: string; data: Restaurant }> {
    const data = await this.restaurantsService.create(createRestaurantDto);
    return { message: RESTAURANT_CREATED_SUCCESSFULLY, data };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all restaurants',
    description: 'retrieve a list of all restaurants.',
  })
  @ApiOkResponse({
    description: 'List of all restaurants.',
    type: Restaurant,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
    required: false,
  })
  async getAllRestaurants(
    @Query() filter: IFilterRestaurant,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{
    message: string;
    data: { restaurants: Restaurant[]; count: number };
  }> {
    const pagination: PaginationDto = { page, limit };
    const { restaurants, count } =
      await this.restaurantsService.getAllRestaurants(filter, pagination);

    return {
      message: LIST_OF_ALL_RESTAURANTS,
      data: { restaurants, count },
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a restaurant by ID',
    description: 'retrieve a restaurant by its ID.',
  })
  @ApiOkResponse({
    description: 'Restaurant found.',
    type: Restaurant,
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async getRestaurantById(
    @Param('id') id: number,
  ): Promise<{ message: string; data: Restaurant }> {
    const data = await this.restaurantsService.getRestaurantById(id);
    return { message: RESTAURANT_FOUND, data };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a restaurant by ID',
    description: 'update a restaurant by its ID.',
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
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ): Promise<{ message: string; data: Restaurant | null }> {
    const data = await this.restaurantsService.updateRestaurant(
      id,
      updateRestaurantDto,
    );
    return { message: RESTAURANT_UPDATED_SUCCESSFULLY, data };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a restaurant by ID',
    description: 'delete a restaurant by its ID.',
  })
  @ApiOkResponse({
    description: 'Restaurant deleted successfully.',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the restaurant',
  })
  async deleteRestaurant(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    await this.restaurantsService.deleteRestaurant(id);
    return { message: RESTAURANT_DELETED_SUCCESSFULLY };
  }
}
