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

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

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
}
