import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menus.entity';
import { MenusRepository } from './menus.repository';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), RestaurantsModule],
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
})
export class MenusModule {}
