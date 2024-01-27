import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Item } from '../items/items.entity';

@Entity()
export class CategoryItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id' })
  item!: Item;
}
