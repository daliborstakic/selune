import { Command } from '@nestjs/cqrs';
import { UserCredentialsDto } from '@selune-backend/dtos';
import { User } from '@selune-backend/entities';

export class ValidateUserCommand extends Command<User> {
  constructor(public readonly userCredentials: UserCredentialsDto) {
    super();
  }
}
