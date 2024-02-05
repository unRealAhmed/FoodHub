import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './categories.entity';

import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CategoryItemRepository } from '../category-item/category-item.repository';
import { CategoryItem } from '../category-item/category-item.entity';

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
  async getAllItemsInCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<CategoryItem[]> {
    console.log(categoryName);
    return this.categoryService.getAllItemsInCategory(categoryName);
  }

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
    return this.categoryItemRepository.deleteItemOnSpecificCategory(itemId);
  }
}
