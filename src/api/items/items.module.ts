import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsRepository } from './items.repository';
import { CategoryItemModule } from '../category-item/category-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CategoryItemModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
})
export class ItemModule {}
