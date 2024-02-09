import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user,repository';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async updateUser(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ${id} not found)`);
    }
    return updatedUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }
}
