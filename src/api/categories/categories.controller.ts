import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':name')
  async getCategoryByName(
    @Param('name') name: string,
  ): Promise<Category | null> {
    return this.categoryService.getCategoryByName(name);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
