import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { CategoryItemModule } from '../category-item/category-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CategoryItemModule],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
