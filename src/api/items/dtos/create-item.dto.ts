import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    type: String,
    example: 'Delicious Burger',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'The price of the item',
    type: Number,
    example: 9.99,
  })
  @IsNumber()
  price!: number;
}
