import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from '../menus.service';
import { MenusRepository } from '../menus.repository';
import { CreateMenuDto } from '../dtos/create-menu.dto';
import { UpdateMenuDto } from '../dtos/update-menu.dto';
import { Menu } from '../menus.entity';
import { NotFoundException } from '@nestjs/common';

describe('MenusService', () => {
  let service: MenusService;
  let mockMenusRepository: Record<keyof MenusRepository, jest.Mock>;

  beforeEach(async () => {
    mockMenusRepository = {
      getAllMenus: jest.fn(),
      getMenuById: jest.fn(),
      createMenu: jest.fn(),
      updateMenu: jest.fn(),
      deleteMenu: jest.fn(),
    } as Record<keyof MenusRepository, jest.Mock>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: MenusRepository,
          useValue: mockMenusRepository,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  // describe('getAllMenus', () => {
  //   it('should return an array of menus', async () => {
  //     const expectedResult: Menu[] = [
  //       {
  //         id: 1,
  //         name: 'Menu 1',
  //         description: 'Description 1',
  //         restaurant: 1,
  //       },
  //     ];

  //     mockMenusRepository.getAllMenus.mockReturnValueOnce(expectedResult);

  //     const result = await service.getAllMenus();

  //     expect(result).toEqual(expectedResult);
  //     expect(mockMenusRepository.getAllMenus).toHaveBeenCalled();
  //   });
  // });

  describe('getMenuById', () => {
    it('should return a menu for a valid ID', async () => {
      const id = 1;
      const expectedResult: Menu = {
        id: 1,
        name: 'Menu 1',
        description: 'Description 1',
        restaurant: {
          id: 1,
          name: 'Restaurant 1',
          rating: 4,
          location: 'Location 1',
        },
      };

      mockMenusRepository.getMenuById.mockReturnValueOnce(expectedResult);

      const result = await service.getMenuById(id);

      expect(result).toEqual(expectedResult);
      expect(mockMenusRepository.getMenuById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      const id = 999;
      mockMenusRepository.getMenuById.mockReturnValueOnce(null);

      await expect(service.getMenuById(id)).rejects.toThrow(NotFoundException);
      expect(mockMenusRepository.getMenuById).toHaveBeenCalledWith(id);
    });
  });

  describe('createMenu', () => {
    it('should create a menu and return the result', async () => {
      const createMenuDto: CreateMenuDto = {
        name: 'New Menu',
        description: 'New Description',
        restaurantId: 1,
      };

      const expectedResult: Menu = {
        id: 1,
        ...createMenuDto,
        restaurant: {
          id: 1,
          name: 'Restaurant 1',
          rating: 4,
          location: 'Location 1',
        },
      };

      mockMenusRepository.createMenu.mockReturnValueOnce(expectedResult);

      const result = await service.createMenu(createMenuDto);

      expect(result).toEqual(expectedResult);
      expect(mockMenusRepository.createMenu).toHaveBeenCalledWith(
        createMenuDto,
      );
    });
  });

  describe('updateMenu', () => {
    it('should update a menu and return the updated object', async () => {
      const id = 1;
      const updateMenuDto: UpdateMenuDto = {
        name: 'Updated Menu',
        description: 'Updated Description',
      };

      const expectedResult: Menu = {
        id: 1,
        ...updateMenuDto,
        restaurant: {
          id: 1,
          name: 'Restaurant 1',
          rating: 4,
          location: 'Location 1',
        },
      };

      mockMenusRepository.updateMenu.mockReturnValueOnce(expectedResult);

      const result = await service.updateMenu(id, updateMenuDto);

      expect(result).toEqual(expectedResult);
      expect(mockMenusRepository.updateMenu).toHaveBeenCalledWith(
        id,
        updateMenuDto,
      );
    });

    it('should throw NotFoundException when updating a non-existent menu', async () => {
      const id = 999;
      const updateMenuDto: UpdateMenuDto = {
        name: 'Updated Menu',
        description: 'Updated Description',
      };

      mockMenusRepository.updateMenu.mockReturnValueOnce(null);

      await expect(service.updateMenu(id, updateMenuDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockMenusRepository.updateMenu).toHaveBeenCalledWith(
        id,
        updateMenuDto,
      );
    });
  });

  describe('deleteMenu', () => {
    it('should delete an existing menu', async () => {
      const id = 1;

      mockMenusRepository.deleteMenu.mockResolvedValueOnce(undefined);

      await service.deleteMenu(id);

      expect(mockMenusRepository.deleteMenu).toHaveBeenCalledWith(id);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
