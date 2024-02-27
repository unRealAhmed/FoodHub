import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../categories.service';
import { CategoryRepository } from '../categories.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../categories.entity';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let mockCategoryRepository: Record<keyof CategoryRepository, jest.Mock>;

  beforeEach(async () => {
    mockCategoryRepository = {
      createCategory: jest.fn(),
      getAllCategories: jest.fn(),
      getCategoryByName: jest.fn(),
      getCategoryById: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    } as Record<keyof CategoryRepository, jest.Mock>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  describe('createCategory', () => {
    it('should create a category and return the result', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'New Category',
      };

      const expectedResult: Category = {
        id: 1,
        ...createCategoryDto,
      };

      mockCategoryRepository.createCategory.mockReturnValueOnce(expectedResult);

      const result = await service.createCategory(createCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(mockCategoryRepository.createCategory).toHaveBeenCalledWith(
        createCategoryDto,
      );
    });
  });

  describe('getAllCategories', () => {
    it('should return an array of categories', async () => {
      const expectedResult: Category[] = [
        {
          id: 1,
          name: 'Category 1',
        },
      ];

      mockCategoryRepository.getAllCategories.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.getAllCategories();

      expect(result).toEqual(expectedResult);
      expect(mockCategoryRepository.getAllCategories).toHaveBeenCalled();
    });
  });

  describe('getCategoryByName', () => {
    it('should return a category for a valid name', async () => {
      const name = 'CategoryName';
      const expectedResult: Category = {
        id: 1,
        name,
      };

      mockCategoryRepository.getCategoryByName.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.getCategoryByName(name);

      expect(result).toEqual(expectedResult);
      expect(mockCategoryRepository.getCategoryByName).toHaveBeenCalledWith(
        name,
      );
    });

    it('should throw NotFoundException for an invalid name', async () => {
      const name = 'InvalidCategoryName';
      mockCategoryRepository.getCategoryByName.mockReturnValueOnce(null);

      await expect(service.getCategoryByName(name)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCategoryRepository.getCategoryByName).toHaveBeenCalledWith(
        name,
      );
    });
  });

  describe('getCategoryById', () => {
    it('should return a category for a valid ID', async () => {
      const id = 1;
      const expectedResult: Category = {
        id,
        name: 'CategoryName',
      };

      mockCategoryRepository.getCategoryById.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.getCategoryById(id);

      expect(result).toEqual(expectedResult);
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      const id = 999;
      mockCategoryRepository.getCategoryById.mockReturnValueOnce(null);

      await expect(service.getCategoryById(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateCategory', () => {
    it('should update a category and return the updated object', async () => {
      const id = 1;
      const updateCategoryDto: CreateCategoryDto = {
        name: 'Updated Category',
      };

      const expectedResult: Category = {
        id,
        ...updateCategoryDto,
      };

      mockCategoryRepository.updateCategory.mockReturnValueOnce(expectedResult);

      const result = await service.updateCategory(id, updateCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(
        id,
        updateCategoryDto,
      );
    });

    it('should throw NotFoundException when updating a non-existent category', async () => {
      const id = 999;
      const updateCategoryDto: CreateCategoryDto = {
        name: 'Updated Category',
      };

      mockCategoryRepository.updateCategory.mockReturnValueOnce(null);

      await expect(
        service.updateCategory(id, updateCategoryDto),
      ).rejects.toThrow(NotFoundException);
      expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(
        id,
        updateCategoryDto,
      );
    });
  });

  describe('deleteCategory', () => {
    it('should delete an existing category', async () => {
      const id = 1;
      mockCategoryRepository.deleteCategory.mockResolvedValueOnce(undefined);

      await service.deleteCategory(id);

      expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(id);
    });

    it('should not throw any error when deleting a non-existent category', async () => {
      const id = 999;
      mockCategoryRepository.deleteCategory.mockResolvedValueOnce(undefined);

      await service.deleteCategory(id);

      expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(id);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
