import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({
    description: 'Updated name of the menu',
    example: 'Updated Special Menu',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Updated description of the menu',
    example: 'Updated description for special occasions',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
