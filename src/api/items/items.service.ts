import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Item } from './items.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import {
  CATEGORY_NOT_FOUND,
  ITEM_NOT_FOUND,
  ITEM_NOT_FOUND_ID,
} from 'src/common/assets/messages';
import { CreateCategoryItemDto } from '../category-item/dtos/create-category-item.dto';
import { CategoryItem } from '../category-item/category-item.entity';
import { DeepPartial } from 'typeorm';
import { CategoryService } from '../categories/categories.service';
import { CategoryItemRepository } from '../category-item/category-item.repository';
import { Pagination } from 'src/types/pagination.interface';
import { PaginatedDto } from 'src/types/paginated.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly categoryService: CategoryService,
    private readonly categoryItemRepository: CategoryItemRepository,
  ) {}

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsRepository.createItem(createItemDto);
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemsRepository.getAllItems();
  }

  async getItemByName(name: string): Promise<Item | null> {
    const item = await this.itemsRepository.getItemByName(name);

    if (!item) {
      throw new NotFoundException(ITEM_NOT_FOUND(name));
    }

    return item;
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = await this.itemsRepository.updateItem(
      id,
      updateItemDto,
    );

    if (!updatedItem) {
      throw new NotFoundException(ITEM_NOT_FOUND_ID(id));
    }

    return updatedItem!;
  }

  async deleteItem(id: number): Promise<void> {
    return this.itemsRepository.deleteItem(id);
  }

  async associateItemWithCategory(
    categoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    const category = await this.categoryService.getCategoryById(
      categoryItemDto.categoryId,
    );

    if (!category) {
      throw new NotFoundException(
        CATEGORY_NOT_FOUND(categoryItemDto.categoryId),
      );
    }

    const categoryItem: DeepPartial<CategoryItem> = {
      category: { id: categoryItemDto.categoryId },
      item: { id: categoryItemDto.itemId },
    };

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return this.categoryItemRepository.createItemInCategory(categoryItem);
  }

  async getAllItemsInCategory(
    categoryName: string,
    paginationParams: Pagination,
  ): Promise<PaginatedDto<CategoryItem>> {
    const { page, limit } = paginationParams;

    // Call the repository method with categoryName
    const [items, total] =
      await this.categoryItemRepository.getAllItemsOnSpecificCategory(
        categoryName,
        page,
        limit,
      );

    return {
      total,
      pages: Math.ceil(total / limit),
      items,
    };
  }

  async deleteItemOnSpecificCategory(itemId: number): Promise<void> {
    await this.categoryItemRepository.deleteItemOnSpecificCategory(itemId);
  }
}
