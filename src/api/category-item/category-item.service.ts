import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryItemDto } from './dtos/create-category-item.dto';
import { CategoryItemRepository } from './category-item.repository';
import { CategoryItem } from './category-item.entity';
import { DeepPartial } from 'typeorm';
import { CategoryService } from '../categories/categories.service';
import { CATEGORY_NOT_FOUND } from 'src/assets/messages';

@Injectable()
export class CategoryItemService {
  constructor(
    private readonly categoryItemRepository: CategoryItemRepository,
  ) {}

  async createItemInCategory(
    categoryItemDto: CreateCategoryItemDto,
    categoryService: CategoryService,
  ): Promise<CategoryItem> {
    const category = await categoryService.getCategoryById(
      categoryItemDto.categoryId,
    );

    if (!category) {
      throw new NotFoundException(
        CATEGORY_NOT_FOUND(categoryItemDto.categoryId),
      );
    }

    const categoryItem: DeepPartial<CategoryItem> = {
      category,
      item: { id: categoryItemDto.itemId },
    };

    return this.categoryItemRepository.createItemInCategory(categoryItem);
  }

  async getAllItemsOnSpecificCategory(
    categoryName: string,
  ): Promise<CategoryItem[]> {
    return this.categoryItemRepository.getAllItemsOnSpecificCategory(
      categoryName,
    );
  }

  async deleteItemOnSpecificCategory(id: number): Promise<void> {
    await this.categoryItemRepository.deleteItemOnSpecificCategory(id);
  }
}
