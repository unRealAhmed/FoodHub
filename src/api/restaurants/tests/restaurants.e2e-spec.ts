import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';

describe('RestaurantsController (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a restaurant', async () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: 'Delicious Delights',
      location: '123 Main Street, Cityville',
      rating: 4.5,
    };

    const response = await request(app.getHttpServer())
      .post('/restaurants')
      .send(createRestaurantDto)
      .expect(HttpStatus.CREATED);

    const createdRestaurant = response.body;
    expect(createdRestaurant.id).toBeDefined();
    expect(createdRestaurant.name).toEqual(createRestaurantDto.name);
    expect(createdRestaurant.location).toEqual(createRestaurantDto.location);
    expect(createdRestaurant.rating).toEqual(createRestaurantDto.rating);
  });

  it('should get all restaurants', async () => {
    const response = await request(app.getHttpServer())
      .get('/restaurants')
      .expect(HttpStatus.OK);

    const result = response.body;
    expect(result).toBeInstanceOf(Array);
  });

  it('should get a restaurant by ID', async () => {
    const restaurantId = 1;

    const response = await request(app.getHttpServer())
      .get(`/restaurants/${restaurantId}`)
      .expect(HttpStatus.OK);

    const result = response.body;
    expect(result.id).toEqual(restaurantId);
  });

  it('should update a restaurant by ID', async () => {
    const restaurantId = 42;
    const updateRestaurantDto: CreateRestaurantDto = {
      name: 'Updated Delights',
      location: '456 Main Street, Cityville',
      rating: 4.8,
    };

    const response = await request(app.getHttpServer())
      .put(`/restaurants/${restaurantId}`)
      .send(updateRestaurantDto)
      .expect(HttpStatus.OK);

    const result = response.body;
    expect(result.id).toEqual(restaurantId);
    expect(result.name).toEqual(updateRestaurantDto.name);
    expect(result.location).toEqual(updateRestaurantDto.location);
    expect(result.rating).toEqual(updateRestaurantDto.rating);
  });

  it('should delete a restaurant by ID', async () => {
    const restaurantId = 1;

    await request(app.getHttpServer())
      .delete(`/restaurants/${restaurantId}`)
      .expect(HttpStatus.NOT_FOUND);

    const deletedResponse = await request(app.getHttpServer())
      .get(`/restaurants/${restaurantId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
