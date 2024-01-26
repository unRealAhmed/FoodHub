import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { UpdateItemDto } from './dtos/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }

  @Get()
  async getAllItems(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get(':name')
  async getItemByName(@Param('name') name: string): Promise<Item | null> {
    return this.itemsService.getItemByName(name);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
