import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Item } from './items.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { ITEM_NOT_FOUND, ITEM_NOT_FOUND_ID } from 'src/common/assets/messages';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

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
}
