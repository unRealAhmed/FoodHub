import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  exports: [TypeOrmModule.forFeature([Restaurant]), RestaurantsService],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantRepository],
})
export class RestaurantsModule {}
