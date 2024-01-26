import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
