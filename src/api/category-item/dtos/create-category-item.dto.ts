import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryItemDto {
  @ApiProperty({ type: Number, description: 'Category ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId!: number;

  @ApiProperty({ type: Number, description: 'Item ID', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  itemId!: number;
}
