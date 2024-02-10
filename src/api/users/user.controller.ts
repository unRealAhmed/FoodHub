import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  LIST_ALL_USERS,
  USER_CREATED_SUCCESSFULLY,
  USER_UPDATED_SUCCESSFULLY,
} from 'src/common/assets/messages';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'create a new user.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Check the request body.',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const user = await this.userService.createUser(createUserDto);
    return { message: USER_CREATED_SUCCESSFULLY, data: user };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'retrieve a list of all users.',
  })
  @ApiOkResponse({
    description: 'List of all users.',
    type: User,
    isArray: true,
  })
  async getAllUsers(): Promise<{ message: string; data: User[] }> {
    const users = await this.userService.getAllUsers();
    return { message: LIST_ALL_USERS, data: users };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'update a user by its ID.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user.',
  })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return { message: USER_UPDATED_SUCCESSFULLY, data: user };
  }
}
