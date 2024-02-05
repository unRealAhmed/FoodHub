import { Injectable, NotFoundException } from '@nestjs/common';
import { MenusRepository } from './menus.repository';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { Menu } from './menus.entity';
import { MENU_NOT_FOUND } from 'src/common/assets/messages';

@Injectable()
export class MenusService {
  constructor(private readonly menuRepository: MenusRepository) {}

  async getAllMenus(): Promise<Menu[]> {
    return this.menuRepository.getAllMenus();
  }

  async getMenuById(id: number): Promise<Menu> {
    const menu = await this.menuRepository.getMenuById(id);

    if (!menu) {
      throw new NotFoundException(MENU_NOT_FOUND(id));
    }

    return menu;
  }

  async createMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuRepository.createMenu(createMenuDto);
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const updatedMenu = await this.menuRepository.updateMenu(id, updateMenuDto);

    if (!updatedMenu) {
      throw new NotFoundException(MENU_NOT_FOUND(id));
    }

    return updatedMenu;
  }

  async deleteMenu(id: number): Promise<void> {
    await this.menuRepository.deleteMenu(id);
  }
}
