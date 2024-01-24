import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { MenusModule } from './api/menus/menus.module';
import { ItemsModule } from './api/items/items.module';
import { CategoriesModule } from './api/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './api/restaurants/restaurant.entity';
import { Menu } from './api/menus/menus.entity';

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
      entities: [Restaurant, Menu],
      // synchronize: true,
    }),
    RestaurantsModule,
    MenusModule,
    ItemsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
