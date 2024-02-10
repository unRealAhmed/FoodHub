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
import {
  MENU_CREATED_SUCCESSFULLY,
  LIST_OF_ALL_MENUS,
  MENU_FOUND,
  MENU_UPDATED_SUCCESSFULLY,
  MENU_DELETED_SUCCESSFULLY,
} from 'src/common/assets/messages';

@Controller('menus')
@ApiTags('Menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all menus',
    description: 'retrieve a list of all menus.',
  })
  @ApiOkResponse({
    description: 'List of all menus.',
    type: Menu,
    isArray: true,
  })
  async getAllMenus(): Promise<{ message: string; data: Menu[] }> {
    const data = await this.menusService.getAllMenus();
    return { message: LIST_OF_ALL_MENUS, data };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a menu by ID',
    description: 'retrieve a menu by its ID.',
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
  async getMenuById(
    @Param('id') id: number,
  ): Promise<{ message: string; data: Menu }> {
    const data = await this.menusService.getMenuById(id);
    return { message: MENU_FOUND, data };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new menu',
    description: 'create a new menu.',
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiCreatedResponse({
    description: 'Menu created successfully.',
    type: Menu,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
  })
  async createMenu(
    @Body() createMenuDto: CreateMenuDto,
  ): Promise<{ message: string; data: Menu }> {
    const data = await this.menusService.createMenu(createMenuDto);
    return { message: MENU_CREATED_SUCCESSFULLY, data };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a menu by ID',
    description: 'update a menu by its ID.',
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
  ): Promise<{ message: string; data: Menu }> {
    const data = await this.menusService.updateMenu(id, updateMenuDto);
    return { message: MENU_UPDATED_SUCCESSFULLY, data };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a menu by ID',
    description: 'delete a menu by its ID.',
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
  async deleteMenu(@Param('id') id: number): Promise<{ message: string }> {
    await this.menusService.deleteMenu(id);
    return { message: MENU_DELETED_SUCCESSFULLY };
  }
}
