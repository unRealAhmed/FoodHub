import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('FoodHub API Documentation')
    .setDescription(
      'API for managing restaurants, menus, items, categories, and their associations.',
    )
    .setVersion('1.0')
    .addTag('Restaurants', 'Endpoints related to restaurants')
    .addTag('Menus', 'Endpoints related to menus')
    .addTag('Categories', 'Endpoints related to categories')
    .addTag('Items', 'Endpoints related to items')
    .addTag('Category Items', 'Endpoints related to category items')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
