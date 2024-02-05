import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Item } from './items.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { ITEM_NOT_FOUND_ID } from 'src/common/assets/messages';

@Injectable()
export class ItemsRepository extends Repository<Item> {
  constructor(private readonly dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }

  async createItem(item: CreateItemDto): Promise<Item> {
    return this.save(item);
  }

  async getAllItems(): Promise<Item[]> {
    return this.find();
  }

  async getItemByName(name: string): Promise<Item | null> {
    return this.findOne({ where: { name } });
  }

  async updateItem(id: number, item: UpdateItemDto): Promise<Item | null> {
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
}
