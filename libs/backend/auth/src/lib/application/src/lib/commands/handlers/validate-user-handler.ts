import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { ValidateUserCommand as ValidateUserCommand } from '../validate-user-command';
import { GetUserByUsernameQuery } from '@selune-backend/user-application';
import * as bcrypt from 'bcrypt';
import { User } from '@selune-backend/entities';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler
  implements ICommandHandler<ValidateUserCommand>
{
  constructor(private queryBus: QueryBus) {}
  async execute(command: ValidateUserCommand): Promise<User> {
    const { password, username } = command.userCredentials;
    const user = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );

    if (user === null)
      throw new BadRequestException(
        'User with provided username does not exist.',
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid user credentials.');

    return user;
  }
}
