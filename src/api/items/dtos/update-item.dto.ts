import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateItemDto {
  @ApiProperty({
    description: 'The updated name of the item',
    type: String,
    example: 'Deluxe Burger',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'The updated price of the item',
    type: Number,
    example: 12.99,
  })
  @IsNumber()
  @Min(0)
  price!: number;
}
