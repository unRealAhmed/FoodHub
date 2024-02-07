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
} from '@nestjs/swagger';
import { CategoryItem } from '../category-item/category-item.entity';
import { CreateCategoryItemDto } from '../category-item/dtos/create-category-item.dto';
// import { Paginate } from 'src/decorators/paginate.decorator';
// import { PaginatedDto } from 'src/types/paginated.dto';
// import { Pagination } from 'src/types/pagination.interface';
// import { ItemsSearchCriteria } from 'src/helpers/filter';
import { PaginationDto } from 'src/types/paginated.dto';
import { IFilterItems } from './dtos/filter-items.dto';

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
  async getAllItems(
    @Query() filter: IFilterItems,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ items: Item[]; count: number }> {
    const pagination: PaginationDto = { page, limit };
    const { items, count } = await this.itemsService.getAllItems(
      filter,
      pagination,
    );
    return { items, count };
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

  @Post('/associate-item')
  @ApiOperation({
    summary: 'Associate an item with a category',
    description: 'Endpoint to associate an item with a category.',
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
  ): Promise<CategoryItem> {
    console.log(createCategoryItemDto);
    return this.itemsService.associateItemWithCategory(createCategoryItemDto);
  }

  @Get(':categoryName/items')
  @ApiOperation({
    summary: 'Get all items in a category',
    description: 'Endpoint to retrieve all items in a category.',
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
  // @Get('/:categoryName')
  // async getAllItemsInCategory(
  //   @Param('categoryName') categoryName: string,
  //   @Paginate() pagination: Pagination,
  // ): Promise<PaginatedDto<CategoryItem>> {
  //   console.log(categoryName);
  //   return this.itemsService.getAllItemsInCategory(categoryName, pagination);
  // }
  @Delete(':categoryId/items/:itemId')
  @ApiOperation({
    summary: 'Delete an item from a category',
    description: 'Endpoint to delete an item from a category.',
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
  async deleteItemFromCategory(@Param('itemId') itemId: number): Promise<void> {
    return this.itemsService.deleteItemOnSpecificCategory(itemId);
  }
}
