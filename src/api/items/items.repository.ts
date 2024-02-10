import { DataSource, In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './items.entity';
import { ITEM_NOT_FOUND_ID } from 'src/common/assets/messages';
import { PaginationDto } from 'src/types/paginated.dto';
import { IFilterItems } from './dtos/filter-items.dto';
import { ItemInterface } from 'src/common/interfaces/item.interface';

@Injectable()
export class ItemsRepository extends Repository<Item> {
  constructor(private readonly dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }

  async createItem(item: ItemInterface): Promise<Item> {
    return this.save(item);
  }

  async getItemsCount(filter: IFilterItems): Promise<number> {
    const count = await this.count({ where: filter });
    return count;
  }

  async getAllItems(
    filter: IFilterItems,
    pagination?: PaginationDto,
  ): Promise<Item[]> {
    const { page = 1, limit = 5 } = pagination || { page: 1, limit: 5 };
    const skip = (page - 1) * limit;
    const { price } = filter;

    return this.find({
      where: {
        ...(!!price && { price }),
      },
      take: limit,
      skip,
    });
  }

  async getItemByName(name: string): Promise<Item | null> {
    return this.findOne({ where: { name } });
  }

  async updateItem(id: number, item: ItemInterface): Promise<Item | null> {
    const result = await this.createQueryBuilder('item')
      .update(Item)
      .set({ ...item })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0] || null;
  }

  async deleteItem(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(ITEM_NOT_FOUND_ID(id));
    }
  }

  async getItemById(id: { id: number }): Promise<Item | null> {
    return this.findOne({ where: id });
  }

  getItemsByIds(ids: number[]) {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }
}
