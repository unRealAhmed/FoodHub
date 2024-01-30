import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryItem } from './category-item.entity';
import { CategoryItemRepository } from './category-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryItem, CategoryItemRepository])],
  providers: [CategoryItemRepository],
  exports: [CategoryItemRepository],
})
export class CategoryItemModule {}
