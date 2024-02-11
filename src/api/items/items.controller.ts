import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/types/paginated.dto';
import { CategoryItem } from '../category-item/category-item.entity';
import { CreateCategoryItemDto } from '../category-item/dtos/create-category-item.dto';
import { IFilterItems } from './dtos/filter-items.dto';
import {
  ITEM_FOUND,
  LIST_ALL_ITEMS,
  ITEM_ASSOCIATED_WITH_CATEGORY_SUCCESSFULLY,
  ITEM_CREATED_SUCCESSFULLY,
  ITEM_DELETED_FROM_CATEGORY_SUCCESSFULLY,
  ITEM_DELETED_SUCCESSFULLY,
  ITEM_UPDATED_SUCCESSFULLY,
  LIST_ITEMS_IN_CATEGORY,
} from 'src/common/assets/messages';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new item',
    description: 'create a new item.',
  })
  @ApiBody({ type: UpdateItemDto })
  @ApiCreatedResponse({
    description: 'Item created successfully.',
    type: Item,
  })
  async createItem(
    @Body() createItemDto: UpdateItemDto,
  ): Promise<{ message: string; data: Item }> {
    const data = await this.itemsService.createItem(createItemDto);
    return { message: ITEM_CREATED_SUCCESSFULLY, data };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all items',
    description: 'retrieve a list of all items.',
  })
  @ApiOkResponse({
    description: 'List of all items.',
    type: Item,
    isArray: true,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
    required: false,
  })
  async getAllItems(
    @Query() filter: IFilterItems,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ message: string; data: { items: Item[]; count: number } }> {
    const pagination: PaginationDto = { page, limit };
    const { items, count } = await this.itemsService.getAllItems(
      filter,
      pagination,
    );
    return { message: LIST_ALL_ITEMS, data: { items, count } };
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get an item by name',
    description: 'retrieve an item by its name.',
  })
  @ApiOkResponse({
    description: 'Item found.',
    type: Item,
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async getItemByName(
    @Param('name') name: string,
  ): Promise<{ message: string; data: Item | null }> {
    const data = await this.itemsService.getItemByName(name);
    return { message: ITEM_FOUND, data };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an item by ID',
    description: 'update an item by its ID.',
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
  ): Promise<{ message: string; data: Item }> {
    const data = await this.itemsService.updateItem(id, updateItemDto);
    return { message: ITEM_UPDATED_SUCCESSFULLY, data };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an item by ID',
    description: 'delete an item by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiOkResponse({
    description: 'Item deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Item not found.',
  })
  async deleteItem(@Param('id') id: number): Promise<{ message: string }> {
    await this.itemsService.deleteItem(id);
    return { message: ITEM_DELETED_SUCCESSFULLY };
  }

  @Post('/associate-item')
  @ApiOperation({
    summary: 'Associate an item with a category',
    description: 'associate an item with a category.',
  })
  @ApiBody({
    type: CreateCategoryItemDto,
    examples: {
      example: {
        value: {
          categoryId: 1,
          itemId: 2,
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Item associated with the category successfully.',
    type: Item,
  })
  @ApiNotFoundResponse({
    description: 'Category or item not found.',
  })
  async associateItemWithCategory(
    @Body() createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<{ message: string; data: CategoryItem }> {
    console.log(createCategoryItemDto);
    const data = await this.itemsService.associateItemWithCategory(
      createCategoryItemDto,
    );
    return { message: ITEM_ASSOCIATED_WITH_CATEGORY_SUCCESSFULLY, data };
  }

  @Get(':categoryName/items')
  @ApiOperation({
    summary: 'Get all items in a category',
    description: 'retrieve all items in a category.',
  })
  @ApiOkResponse({
    description: 'List of items in a category.',
    type: CategoryItem,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiParam({
    name: 'categoryName',
    description: 'The name of the category.',
  })
  @Get('/:categoryName/items')
  async getAllItemsInCategory(
    @Param('categoryName') categoryName: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{
    message: string;
    data: { category_items: CategoryItem[]; count: number };
  }> {
    const pagination: PaginationDto = { page, limit };
    const data = await this.itemsService.getAllItemsInCategory(
      categoryName,
      pagination,
    );
    return { message: LIST_ITEMS_IN_CATEGORY, data };
  }

  @Delete(':categoryId/items/:itemId')
  @ApiOperation({
    summary: 'Delete an item from a category',
    description: 'delete an item from a category.',
  })
  @ApiOkResponse({
    description: 'Item deleted from the category successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Category item not found.',
  })
  @ApiParam({
    name: 'categoryId',
    description: 'The ID of the category.',
  })
  @ApiParam({
    name: 'itemId',
    description: 'The ID of the item to delete.',
  })
  async deleteItemFromCategory(
    @Param('itemId') itemId: number,
  ): Promise<{ message: string }> {
    await this.itemsService.deleteItemOnSpecificCategory(itemId);
    return { message: ITEM_DELETED_FROM_CATEGORY_SUCCESSFULLY };
  }
}
