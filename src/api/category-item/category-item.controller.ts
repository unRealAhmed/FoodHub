import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CategoryItemService } from './category-item.service';
import { CreateCategoryItemDto } from './dtos/create-category-item.dto';
import { CategoryItem } from './category-item.entity';
import { CategoryService } from '../categories/categories.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('category-items')
@ApiTags('Category Items')
export class CategoryItemController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryItemService: CategoryItemService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Associate item to a specific category',
    description: 'Endpoint to Associate item to a specific category.',
  })
  @ApiCreatedResponse({
    description: 'Category item created successfully.',
    type: CategoryItem,
  })
  @ApiNotFoundResponse({
    description: 'Category or item not found.',
  })
  @ApiBody({ type: CreateCategoryItemDto })
  async createItemInCategory(
    @Body() categoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    return this.categoryItemService.createItemInCategory(
      categoryItemDto,
      this.categoryService,
    );
  }

  @Get(':categoryName')
  @ApiOperation({
    summary: 'Get all items in a specific category',
    description: 'Endpoint to retrieve all items in a specific category.',
  })
  @ApiOkResponse({
    description: 'List of items in a specific category.',
    type: CategoryItem,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiParam({ name: 'categoryName', description: 'Name of the category' })
  async getAllItemsOnSpecificCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<CategoryItem[]> {
    return this.categoryItemService.getAllItemsOnSpecificCategory(categoryName);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specific item in a category',
    description: 'Endpoint to delete a specific item in a category.',
  })
  @ApiOkResponse({ description: 'Category item deleted successfully.' })
  @ApiNotFoundResponse({
    description: 'Category item not found.',
  })
  @ApiParam({ name: 'id', description: 'ID of the category item' })
  async deleteItemOnSpecificCategory(@Param('id') id: number): Promise<void> {
    await this.categoryItemService.deleteItemOnSpecificCategory(id);
  }
}
