import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserInterface } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: UserInterface): Promise<User> {
    return await this.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async updateUser(id: number, user: UserInterface): Promise<User | null> {
    const result = await this.createQueryBuilder()
      .update(user)
      .set({ ...user })
      .where('id = :id', { id })
      .returning('*')
      .execute();
    return result.raw[0] || null;
  }

  async getById(id: number): Promise<User | null> {
    return await this.findOne({ where: { id } });
  }
}
