import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { Menu } from './menus.entity';

import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('menus')
@ApiTags('Menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all menus',
    description: 'Endpoint to retrieve a list of all menus.',
  })
  @ApiOkResponse({
    description: 'List of all menus.',
    type: Menu,
    isArray: true,
  })
  async getAllMenus(): Promise<Menu[]> {
    return this.menusService.getAllMenus();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a menu by ID',
    description: 'Endpoint to retrieve a menu by its ID.',
  })
  @ApiOkResponse({
    description: 'Menu found.',
    type: Menu,
  })
  @ApiNotFoundResponse({
    description: 'Menu not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the menu',
  })
  async getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menusService.getMenuById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new menu',
    description: 'Endpoint to create a new menu.',
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiCreatedResponse({
    description: 'Menu created successfully.',
    type: Menu,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
  })
  async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.createMenu(createMenuDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a menu by ID',
    description: 'Endpoint to update a menu by its ID.',
  })
  @ApiBody({ type: UpdateMenuDto })
  @ApiOkResponse({
    description: 'Menu updated successfully.',
    type: Menu,
  })
  @ApiNotFoundResponse({
    description: 'Menu not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the menu',
  })
  async updateMenu(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menusService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a menu by ID',
    description: 'Endpoint to delete a menu by its ID.',
  })
  @ApiOkResponse({
    description: 'Menu deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Menu not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the menu',
  })
  async deleteMenu(@Param('id') id: number): Promise<void> {
    return this.menusService.deleteMenu(id);
  }
}
