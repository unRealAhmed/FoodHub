import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { Menu } from './menus.entity';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus(): Promise<Menu[]> {
    return this.menusService.getAllMenus();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menusService.getMenuById(id);
  }

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.createMenu(createMenuDto);
  }

  @Patch(':id')
  async updateMenu(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menusService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: number): Promise<void> {
    return this.menusService.deleteMenu(id);
  }
}
