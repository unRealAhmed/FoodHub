import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Name of the menu',
    example: 'Special Menu',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Description of the menu',
    example: 'Delicious dishes for special occasions',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'ID of the associated restaurant',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  restaurantId!: number;
}
