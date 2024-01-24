import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant!: Restaurant;
}
