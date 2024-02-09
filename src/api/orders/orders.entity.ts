import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Item } from '../items/items.entity';

@Entity()
export class AbstractEntity {
  @ApiProperty()
  @PrimaryColumn()
  @Generated('increment')
  id!: number;

  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
  @DeleteDateColumn()
  deleted_at?: Date;
}

@Entity()
export class Order extends AbstractEntity {
  @ApiProperty()
  @Column()
  totalAmount!: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders)
  user!: User[];

  @ApiProperty()
  @ManyToMany(() => Item, (item) => item.orders)
  @JoinTable()
  items!: Item[];

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [
      'fulfilled',
      'inProgress',
      'cancelledByUser',
      'cancelledByRestaurant',
    ],
  })
  status!: string;
}
