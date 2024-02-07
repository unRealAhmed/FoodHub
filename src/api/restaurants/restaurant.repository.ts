import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';
import { RESTAURANT_NOT_FOUND } from '../../common/assets/messages';
// import { Pagination } from 'src/types/pagination.interface';
import { PaginationDto } from 'src/types/paginated.dto';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {
  constructor(private readonly dataSource: DataSource) {
    super(Restaurant, dataSource.createEntityManager());
  }
  async createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant> {
    return this.save(restaurant);
  }

  async getRestaurantsCount(): Promise<number> {
    const count = await this.createQueryBuilder().getCount();
    return count;
  }

  async getAllRestaurants(pagination?: PaginationDto): Promise<Restaurant[]> {
    const { page = 1, limit = 5 } = pagination || { page: 1, limit: 5 };
    const skip = (page - 1) * limit;

    const restaurants = await this.createQueryBuilder()
      .skip(skip)
      .take(limit)
      .getMany();

    //   const [restaurants, count] = await this.createQueryBuilder()
    //   .skip(skip)
    //   .take(take)
    //   .getManyAndCount();

    // return [restaurants, count];

    return restaurants;
  }

  async getRestaurantById(id: number): Promise<Restaurant | null> {
    return this.findOne({ where: { id } });
  }

  async updateRestaurant(
    id: number,
    restaurant: CreateRestaurantDto,
  ): Promise<Restaurant | null> {
    const result = await this.createQueryBuilder()
      .update(Restaurant)
      .set({ ...restaurant })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0] || null;
  }

  async deleteRestaurant(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(RESTAURANT_NOT_FOUND(id));
    }
  }
}
