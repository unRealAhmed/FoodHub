import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'Ahmed Sayed',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Address of user',
    example: '6th of october',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'user phone number',
    example: '01202056613',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  contactNumber!: string;
}
