import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryItemDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId!: number;

  @IsNumber()
  @IsNotEmpty()
  itemId!: number;
}
