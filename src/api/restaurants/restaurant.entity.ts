import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Delicious Delights' })
  @Column()
  name!: string;

  @ApiProperty({ example: 4.5 })
  @Column({ type: 'float' })
  rating!: number;

  @ApiProperty({ example: '123 Main Street, Cityville' })
  @Column()
  location!: string;
}
