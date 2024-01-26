import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CategoryItemService } from './category-item.service';
import { CreateCategoryItemDto } from './dtos/create-category-item.dto';
import { CategoryItem } from './category-item.entity';
import { CategoryService } from '../categories/categories.service';

@Controller('category-items')
export class CategoryItemController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryItemService: CategoryItemService,
  ) {}

  @Post()
  async createItemInCategory(
    @Body() categoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    return this.categoryItemService.createItemInCategory(
      categoryItemDto,
      this.categoryService,
    );
  }

  @Get(':categoryName')
  async getAllItemsOnSpecificCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<CategoryItem[]> {
    return this.categoryItemService.getAllItemsOnSpecificCategory(categoryName);
  }

  @Delete(':id')
  async deleteItemOnSpecificCategory(@Param('id') id: number): Promise<void> {
    await this.categoryItemService.deleteItemOnSpecificCategory(id);
  }
}
