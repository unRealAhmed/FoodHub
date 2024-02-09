import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/api/users/user.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'total Amount of order',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  totalAmount!: number;

  @ApiProperty({
    description: 'user Id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  user!: User[];

  @ApiProperty({
    description: 'list of items in the order',
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  items!: number[];

  @ApiProperty({
    description: 'Order status',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  status: string = 'inProgress';
}
