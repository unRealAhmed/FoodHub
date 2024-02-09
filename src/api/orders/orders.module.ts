import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';
import { ItemsRepository } from '../items/items.repository';
import { ItemModule } from '../items/items.module';
import { UserModule } from '../users/user.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ItemModule,
    UserModule,
    RestaurantsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
