import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category.',
    example: 'Desserts',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
}
