import { Command } from '@nestjs/cqrs';
import { CreateUserDto } from '@selune-backend/dtos';

export class CreateUserCommand extends Command<string> {
  constructor(public readonly createUserDto: CreateUserDto) {
    super();
  }
}
