import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '../items.service';
import { ItemsRepository } from '../items.repository';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Item } from '../items.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { CategoryService } from '../../categories/categories.service';
import { CategoryItemRepository } from '../../category-item/category-item.repository';
import { PaginationDto } from 'src/types/paginated.dto';

describe('ItemsService', () => {
  let service: ItemsService;
  let mockItemsRepository: Record<keyof ItemsRepository, jest.Mock>;
  let mockCategoryService: Record<keyof CategoryService, jest.Mock>;
  let mockCategoryItemRepository: Record<
    keyof CategoryItemRepository,
    jest.Mock
  >;

  beforeEach(async () => {
    mockItemsRepository = {
      createItem: jest.fn(),
      getAllItems: jest.fn(),
      getItemsCount: jest.fn(),
      getItemByName: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
    } as Record<keyof ItemsRepository, jest.Mock>;
    mockCategoryService = {
      getCategoryById: jest.fn(),
    } as Record<keyof CategoryService, jest.Mock>;
    mockCategoryItemRepository = {
      createItemInCategory: jest.fn(),
      getAllItemsOnSpecificCategory: jest.fn(),
      getCategoryItemsCount: jest.fn(),
      deleteItemOnSpecificCategory: jest.fn(),
    } as Record<keyof CategoryItemRepository, jest.Mock>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemsRepository,
          useValue: mockItemsRepository,
        },
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
        {
          provide: CategoryItemRepository,
          useValue: mockCategoryItemRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  describe('createItem', () => {
    it('should create an item and return the result', async () => {
      const createItemDto: CreateItemDto = {
        name: 'Pizza',
        price: 10.99,
      };

      const expectedResult: Item = {
        id: 1,
        ...createItemDto,
        orders: [],
      };

      mockItemsRepository.createItem.mockReturnValueOnce(expectedResult);

      const result = await service.createItem(createItemDto);

      expect(result).toEqual(expectedResult);
      expect(mockItemsRepository.createItem).toHaveBeenCalledWith(
        createItemDto,
      );
    });
  });

  // describe('getAllItems', () => {
  //   it('should return an array of items', async () => {
  //     const expectedResult: Item[] = [
  //       {
  //         id: 1,
  //         name: 'Pizza',
  //         price: 10.99,
  //         orders: [],
  //       },
  //     ];

  //     mockItemsRepository.getAllItems.mockReturnValueOnce(expectedResult);
  //     const filter = {};
  //     const pagination: PaginationDto = {
  //       page: 1,
  //       limit: 10,
  //     };

  //     const result = await service.getAllItems(filter, pagination);

  //     expect(result).toEqual(expectedResult);
  //     expect(mockItemsRepository.getAllItems).toHaveBeenCalledWith(
  //       filter,
  //       pagination,
  //     );
  //   });

  //   it('should return an empty array if no items are found', async () => {
  //     const expectedResult: Item[] = [];

  //     mockItemsRepository.getAllItems.mockReturnValueOnce(expectedResult);
  //     const filter = {};
  //     const pagination: PaginationDto = {
  //       page: 1,
  //       limit: 10,
  //     };

  //     const result = await service.getAllItems(filter, pagination);

  //     expect(result).toEqual(expectedResult);
  //     expect(mockItemsRepository.getAllItems).toHaveBeenCalledWith(
  //       filter,
  //       pagination,
  //     );
  //   });
  // });

  describe('getItemByName', () => {
    it('should return an item for a valid name', async () => {
      const name = 'Pizza';
      const expectedResult: Item = {
        id: 1,
        name: 'Pizza',
        price: 10.99,
        orders: [],
      };

      mockItemsRepository.getItemByName.mockReturnValueOnce(expectedResult);

      const result = await service.getItemByName(name);

      expect(result).toEqual(expectedResult);
      expect(mockItemsRepository.getItemByName).toHaveBeenCalledWith(name);
    });

    it('should throw NotFoundException for an invalid name', async () => {
      const name = 'InvalidItem';
      mockItemsRepository.getItemByName.mockReturnValueOnce(null);

      await expect(service.getItemByName(name)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockItemsRepository.getItemByName).toHaveBeenCalledWith(name);
    });
  });

  describe('updateItem', () => {
    it('should update an item and return the updated object', async () => {
      const id = 1;
      const updateItemDto: UpdateItemDto = {
        name: 'Updated Pizza',
        price: 12.99,
      };

      const expectedResult: Item = {
        id: 1,
        ...updateItemDto,
        orders: [],
      };

      mockItemsRepository.updateItem.mockReturnValueOnce(expectedResult);

      const result = await service.updateItem(id, updateItemDto);

      expect(result).toEqual(expectedResult);
      expect(mockItemsRepository.updateItem).toHaveBeenCalledWith(
        id,
        updateItemDto,
      );
    });

    it('should throw NotFoundException when updating a non-existent item', async () => {
      const id = 999;
      const updateItemDto: UpdateItemDto = {
        name: 'Updated Pizza',
        price: 12.99,
      };

      mockItemsRepository.updateItem.mockReturnValueOnce(null);

      await expect(service.updateItem(id, updateItemDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockItemsRepository.updateItem).toHaveBeenCalledWith(
        id,
        updateItemDto,
      );
    });
  });

  describe('deleteItem', () => {
    it('should delete an existing item', async () => {
      const id = 1;
      mockItemsRepository.deleteItem.mockResolvedValueOnce(undefined);

      await service.deleteItem(id);

      expect(mockItemsRepository.deleteItem).toHaveBeenCalledWith(id);
    });

    it('should not throw any error when deleting a non-existent item', async () => {
      const id = 999;
      mockItemsRepository.deleteItem.mockResolvedValueOnce(undefined);

      await service.deleteItem(id);

      expect(mockItemsRepository.deleteItem).toHaveBeenCalledWith(id);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
