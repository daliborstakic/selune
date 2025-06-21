import { Command } from '@nestjs/cqrs';
import { CreateUserDto } from '@selune-backend/dtos';

export class RegisterUserCommand extends Command<string> {
  constructor(public readonly createUserDto: CreateUserDto) {
    super();
  }
}
