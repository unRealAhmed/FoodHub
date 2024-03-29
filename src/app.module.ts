import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { MenusModule } from './api/menus/menus.module';
import { ItemModule } from './api/items/items.module';
import { CategoryModule } from './api/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './api/restaurants/restaurant.entity';
import { Menu } from './api/menus/menus.entity';
import { CategoryItemModule } from './api/category-item/category-item.module';
import { Category } from './api/categories/categories.entity';
import { Item } from './api/items/items.entity';
import { CategoryItem } from './api/category-item/category-item.entity';
import { UserModule } from './api/users/user.module';
import { User } from './api/users/user.entity';
import { OrdersModule } from './api/orders/orders.module';
import { Order } from './api/orders/orders.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Restaurant, Menu, Category, Item, CategoryItem, User, Order],
      synchronize: true,
    }),
    RestaurantsModule,
    MenusModule,
    ItemModule,
    CategoryModule,
    CategoryItemModule,
    UserModule,
    OrdersModule,
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       target: 'pino-pretty',
    //       options: {
    //         singleLine: true,
    //       },
    //     },
    //   },
    // }),
  ],
})
export class AppModule {}
