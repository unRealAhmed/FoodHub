import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CATEGORY_NOT_FOUND } from 'src/common/assets/messages';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    console.log(category);
    return this.categoryRepository.createCategory(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }
  async getCategoryByName(name: string): Promise<Category | null> {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) {
      throw new NotFoundException(`category ${name} not found`);
    }
    return category;
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const category = this.categoryRepository.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`category ${id} not found`);
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const updatedCateogry = await this.categoryRepository.updateCategory(
      id,
      updateCategoryDto,
    );

    if (!updatedCateogry) {
      throw new NotFoundException(CATEGORY_NOT_FOUND(id));
    }
    return updatedCateogry;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}
