import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
