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
    console.log(categoryItem);
    return this.save(categoryItem);
  }

  async getAllItemsOnSpecificCategory(
    categoryName: string,
    page: number,
    limit: number,
  ): Promise<[CategoryItem[], number]> {
    const [items, total] = await this.createQueryBuilder('categoryItem')
      .leftJoinAndSelect('categoryItem.category', 'category')
      .leftJoinAndSelect('categoryItem.item', 'item')
      .where('category.name = :categoryName', { categoryName })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [items, total];
  }

  async deleteItemOnSpecificCategory(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
