import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@selune-backend/entities';
import { Repository } from 'typeorm';
import { generateHash } from '@selune-backend/helpers';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(command: RegisterUserCommand): Promise<string> {
    const { password, ...rest } = command.createUserDto;
    const hashedPassword = await generateHash(password);

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return savedUser.id;
  }
}
