import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants.service';
import { RestaurantRepository } from '../restaurant.repository';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';
import { Restaurant } from '../restaurant.entity';
import { NotFoundException } from '@nestjs/common';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let mockRestaurantRepository: Record<keyof RestaurantRepository, jest.Mock>;

  beforeEach(async () => {
    mockRestaurantRepository = {
      createRestaurant: jest.fn(),
      getAllRestaurants: jest.fn(),
      getRestaurantById: jest.fn(),
      updateRestaurant: jest.fn(),
      deleteRestaurant: jest.fn(),
    } as Record<keyof RestaurantRepository, jest.Mock>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RestaurantRepository,
          useValue: mockRestaurantRepository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  describe('getAllRestaurants', () => {
    it('should return an array of restaurants', async () => {
      const expectedResult: Restaurant[] = [
        {
          id: 1,
          name: 'Mcdonald',
          rating: 2,
          location: '6th of October',
        },
      ];

      mockRestaurantRepository.getAllRestaurants.mockReturnValueOnce(
        expectedResult,
      );
      const filter = {};

      const result = await service.getAllRestaurants(filter);

      expect(result).toEqual(expectedResult);
      expect(mockRestaurantRepository.getAllRestaurants).toHaveBeenCalled();
    });

    it('should return an empty array if no restaurants are found', async () => {
      const expectedResult: Restaurant[] = [];

      mockRestaurantRepository.getAllRestaurants.mockReturnValueOnce(
        expectedResult,
      );

      const filter = {};

      const result = await service.getAllRestaurants(filter);

      expect(result).toEqual(expectedResult);
      expect(mockRestaurantRepository.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('getRestaurantById', () => {
    it('should return a restaurant for a valid ID', async () => {
      const id = 1;
      const expectedResult: Restaurant = {
        id: 1,
        name: 'Mcdonald',
        rating: 2,
        location: '6th of October',
      };

      mockRestaurantRepository.getRestaurantById.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.getRestaurantById(id);

      expect(result).toEqual(expectedResult);
      expect(mockRestaurantRepository.getRestaurantById).toHaveBeenCalledWith(
        id,
      );
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      const id = 999;
      mockRestaurantRepository.getRestaurantById.mockReturnValueOnce(null);

      await expect(service.getRestaurantById(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRestaurantRepository.getRestaurantById).toHaveBeenCalledWith(
        id,
      );
    });
  });

  describe('create', () => {
    it('should create a restaurant and return the result', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'Na3ema',
        rating: 4.7,
        location: '6th of October',
      };

      const expectedResult: Restaurant = {
        id: 2,
        ...createRestaurantDto,
      };

      mockRestaurantRepository.createRestaurant.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.create(createRestaurantDto);

      expect(result).toEqual(expectedResult);
      expect(mockRestaurantRepository.createRestaurant).toHaveBeenCalledWith(
        createRestaurantDto,
      );
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant and return the updated object', async () => {
      const updateRestaurantDto: CreateRestaurantDto = {
        name: 'Updated Macdonald',
        rating: 4.85,
        location: '6th of October',
      };

      const expectedResult: Restaurant = {
        id: 1,
        ...updateRestaurantDto,
      };

      mockRestaurantRepository.updateRestaurant.mockReturnValueOnce(
        expectedResult,
      );

      const result = await service.updateRestaurant(1, updateRestaurantDto);

      expect(result).toEqual(expectedResult);
      expect(mockRestaurantRepository.updateRestaurant).toHaveBeenCalledWith(
        1,
        updateRestaurantDto,
      );
    });

    it('should throw NotFoundException when updating a non-existent restaurant', async () => {
      const updateRestaurantDto: CreateRestaurantDto = {
        name: 'Updated Macdonald',
        rating: 4.85,
        location: '6th of October',
      };

      mockRestaurantRepository.updateRestaurant.mockReturnValueOnce(null);

      await expect(
        service.updateRestaurant(1, updateRestaurantDto),
      ).rejects.toThrow(NotFoundException);

      expect(mockRestaurantRepository.updateRestaurant).toHaveBeenCalledWith(
        1,
        updateRestaurantDto,
      );
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete an existing restaurant', async () => {
      mockRestaurantRepository.deleteRestaurant.mockResolvedValueOnce(
        undefined,
      );

      await service.deleteRestaurant(1);

      expect(mockRestaurantRepository.deleteRestaurant).toHaveBeenCalledWith(1);
    });

    it('should not throw any error when deleting a non-existent restaurant', async () => {
      mockRestaurantRepository.deleteRestaurant.mockResolvedValueOnce(
        undefined,
      );

      await service.deleteRestaurant(1);

      expect(mockRestaurantRepository.deleteRestaurant).toHaveBeenCalledWith(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
