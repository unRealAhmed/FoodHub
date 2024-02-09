import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @Column()
  address!: string;

  @ApiProperty()
  @Column()
  contactNumber!: string;

  @ApiProperty()
  @OneToMany(() => Order, (orders) => orders.user)
  orders!: Order[];
}
