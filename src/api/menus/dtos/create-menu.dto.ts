import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  restaurantId!: number;
}
