import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryItem } from './category-item.entity';
import { CategoryItemController } from './category-item.controller';
import { CategoryItemService } from './category-item.service';
import { CategoryItemRepository } from './category-item.repository';
import { CategoryModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryItem]), CategoryModule],
  controllers: [CategoryItemController],
  providers: [CategoryItemService, CategoryItemRepository],
  exports: [CategoryItemService],
})
export class CategoryItemModule {}
