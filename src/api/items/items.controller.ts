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
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new item',
    description: 'Endpoint to create a new item.',
  })
  @ApiBody({ type: UpdateItemDto })
  @ApiCreatedResponse({
    description: 'Item created successfully.',
    type: Item,
  })
  async createItem(@Body() createItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all items',
    description: 'Endpoint to retrieve a list of all items.',
  })
  @ApiOkResponse({
    description: 'List of all items.',
    type: Item,
    isArray: true,
  })
  async getAllItems(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get an item by name',
    description: 'Endpoint to retrieve an item by its name.',
  })
  @ApiOkResponse({
    description: 'Item found.',
    type: Item,
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async getItemByName(@Param('name') name: string): Promise<Item | null> {
    return this.itemsService.getItemByName(name);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an item by ID',
    description: 'Endpoint to update an item by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiBody({ type: UpdateItemDto })
  @ApiOkResponse({
    description: 'Item updated successfully.',
    type: Item,
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an item by ID',
    description: 'Endpoint to delete an item by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiOkResponse({
    description: 'Item deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
