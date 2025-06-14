import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@selune-backend/entities';
import { Repository } from 'typeorm';
import { generateHash } from '@selune-backend/helpers';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const plaintextPassword = command.createUserDto.password;

    command.createUserDto.password = await generateHash(plaintextPassword);
    const user = this.userRepository.create(command.createUserDto);
    const savedUser = await this.userRepository.save(user);

    return savedUser.id;
  }
}
