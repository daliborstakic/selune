import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto, UserDto } from '@selune-backend/dtos';
import {
  CreateUserCommand,
  GetUserByUsernameQuery,
  GetUsersQuery,
} from '@selune-backend/user-application';
import { User } from '@selune-backend/entities';

@Injectable()
export class UserService {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  public findAll(): Promise<UserDto[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  public async createAsync(createUserDto: CreateUserDto): Promise<string> {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  public async findOneByUsername(username: string): Promise<User> {
    const user = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );

    if (!user)
      throw new Error(`User with the username ${username} does not exist.`);

    return user;
  }
}
