import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'Delicious Delights',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Rating of the restaurant (between 1 and 5)',
    example: 4.5,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({
    description: 'Location of the restaurant',
    example: '123 Main Street, Cityville',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  location!: string;
}
