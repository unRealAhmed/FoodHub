import { DataSource, Repository } from 'typeorm';
import { Category } from './categories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CATEGORY_NOT_FOUND } from 'src/common/assets/messages';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    return this.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.find();
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return this.findOne({ where: { name } });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.findOne({ where: { id } });
  }

  async updateCategory(
    id: number,
    category: CreateCategoryDto,
  ): Promise<Category | null> {
    // console.log(category);

    const result = await this.createQueryBuilder('category')
      .update(Category)
      .set({ ...category })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0] || null;
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(CATEGORY_NOT_FOUND(id));
    }
  }
}
