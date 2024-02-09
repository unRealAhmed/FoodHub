import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity()
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @Column()
  price!: number;

  @ApiProperty()
  @ManyToMany(() => Order, (order) => order.items)
  orders!: Order[];

  static fromPartial(partial: Partial<Item>) {
    return Object.assign({}, new Item(), partial);
  }
}
