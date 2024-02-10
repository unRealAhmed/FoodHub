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
import {
  CATEGORY_FOUND,
  CATEGORY_CREATED_SUCCESSFULLY,
  CATEGORY_DELETED_SUCCESSFULLY,
  LIST_ALL_CATEGORIES,
  CATEGORY_UPDATED_SUCCESSFULLY,
} from 'src/common/assets/messages';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description: 'retrieve a list of all categories.',
  })
  @ApiOkResponse({
    description: 'List of all categories.',
    type: Category,
    isArray: true,
  })
  async getAllCategories(): Promise<{ message: string; data: Category[] }> {
    const data = await this.categoryService.getAllCategories();
    return { message: LIST_ALL_CATEGORIES, data };
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a category by name',
    description: 'retrieve a category by its name.',
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
  ): Promise<{ message: string; data: Category | null }> {
    const category = await this.categoryService.getCategoryByName(name);
    return { message: CATEGORY_FOUND, data: category };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new category',
    description: 'create a new category.',
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
  ): Promise<{ message: string; data: Category }> {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return { message: CATEGORY_CREATED_SUCCESSFULLY, data };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a category by ID',
    description: 'update a category by its ID.',
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
  ): Promise<{ message: string; data: Category | null }> {
    const category = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
    );
    return { message: CATEGORY_UPDATED_SUCCESSFULLY, data: category };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category by ID',
    description: 'delete a category by its ID.',
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
  async deleteCategory(@Param('id') id: number): Promise<{ message: string }> {
    await this.categoryService.deleteCategory(id);
    return { message: CATEGORY_DELETED_SUCCESSFULLY };
  }
}
