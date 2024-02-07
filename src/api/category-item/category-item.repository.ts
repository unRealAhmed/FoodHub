import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryItem } from './category-item.entity';
import { PaginationDto } from 'src/types/paginated.dto';

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

  async getCategoryItemsCount(categoryName: string): Promise<number> {
    const count = await this.count({
      where: { category: { name: categoryName } },
    });
    return count;
  }

  async getAllItemsOnSpecificCategory(
    categoryName: string,
    pagination: PaginationDto,
  ): Promise<[CategoryItem[]]> {
    const { page = 1, limit = 5 } = pagination || { page: 1, limit: 5 };
    const skip = (page - 1) * limit;

    const category_items = await this.createQueryBuilder('categoryItem')
      .leftJoinAndSelect('categoryItem.category', 'category')
      .leftJoinAndSelect('categoryItem.item', 'item')
      .where('category.name = :categoryName', { categoryName })
      .skip(skip)
      .take(limit)
      .execute();

    return category_items;
  }

  async deleteItemOnSpecificCategory(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
