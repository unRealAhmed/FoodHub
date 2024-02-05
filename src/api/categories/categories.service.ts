import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CATEGORY_NOT_FOUND } from 'src/common/assets/messages';
import { CategoryRepository } from './categories.repository';
import { CategoryItemRepository } from '../category-item/category-item.repository';
import { CategoryItem } from '../category-item/category-item.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryItemRepository: CategoryItemRepository,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    console.log(category);
    return this.categoryRepository.createCategory(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return this.categoryRepository.getCategoryByName(name);
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
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

  async getAllItemsInCategory(categoryName: string): Promise<CategoryItem[]> {
    return this.categoryItemRepository.getAllItemsOnSpecificCategory(
      categoryName,
    );
  }

  async deleteItemFromCategory(itemId: number): Promise<void> {
    await this.categoryItemRepository.deleteItemOnSpecificCategory(itemId);
  }
}
