import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryItem } from './category-item.entity';

@Injectable()
export class CategoryItemRepository extends Repository<CategoryItem> {
  constructor(private readonly dataSource: DataSource) {
    super(CategoryItem, dataSource.createEntityManager());
  }

  async createItemInCategory(
    categoryItem: DeepPartial<CategoryItem>,
  ): Promise<CategoryItem> {
    return this.save(categoryItem);
  }

  async getAllItemsOnSpecificCategory(
    categoryName: string,
  ): Promise<CategoryItem[]> {
    return this.createQueryBuilder('categoryItem')
      .leftJoinAndSelect('categoryItem.category', 'category')
      .leftJoinAndSelect('categoryItem.item', 'item')
      .where('category.name = :categoryName', { categoryName })
      .getMany();
  }

  async deleteItemOnSpecificCategory(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
