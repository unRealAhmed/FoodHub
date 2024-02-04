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
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Category } from '../categories/categories.entity';
import { CategoryService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dtos/create-category.dto';
import { CategoryItem } from '../category-item/category-item.entity';
import { CategoryItemRepository } from '../category-item/category-item.repository';
import { CreateCategoryItemDto } from '../category-item/dtos/create-category-item.dto';

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

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryItemRepository: CategoryItemRepository,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Endpoint to retrieve a list of all categories.',
  })
  @ApiOkResponse({
    description: 'List of all categories.',
    type: Category,
    isArray: true,
  })
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a category by name',
    description: 'Endpoint to retrieve a category by its name.',
  })
  @ApiOkResponse({
    description: 'Category found.',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiParam({
    name: 'name',
    description: 'The name of the category.',
  })
  async getCategoryByName(
    @Param('name') name: string,
  ): Promise<Category | null> {
    return this.categoryService.getCategoryByName(name);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Endpoint to create a new category.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      example: {
        value: {
          name: 'Desserts',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Category created successfully.',
    type: Category,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a category by ID',
    description: 'Endpoint to update a category by its ID.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      example: {
        value: {
          name: 'Updated Desserts',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Category updated successfully.',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category.',
  })
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category by ID',
    description: 'Endpoint to delete a category by its ID.',
  })
  @ApiOkResponse({
    description: 'Category deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the category.',
  })
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
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
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Category or item not found.',
  })
  async associateItemWithCategory(
    @Body() createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    return this.categoryService.associateItemWithCategory(
      createCategoryItemDto,
    );
  }
}
