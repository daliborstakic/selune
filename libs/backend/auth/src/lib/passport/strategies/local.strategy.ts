import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { User } from '@selune-backend/entities';
import { UserCredentialsDto } from '@selune-backend/dtos';
import { ValidateUserCommand } from '@selune-backend/auth-application';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private commandBus: CommandBus) {
    super();
  }

  override async validate(username: string, password: string): Promise<User> {
    const userCredentials: UserCredentialsDto = { username, password };

    console.log(userCredentials);

    const user = await this.commandBus.execute(
      new ValidateUserCommand(userCredentials),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
