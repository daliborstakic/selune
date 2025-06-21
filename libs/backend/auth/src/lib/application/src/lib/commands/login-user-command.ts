import { Command } from '@nestjs/cqrs';
import { AccessToken, UserCredentialsDto } from '@selune-backend/dtos';

export class LoginUserCommand extends Command<AccessToken> {
  constructor(public readonly userCredentails: UserCredentialsDto) {
    super();
  }
}
