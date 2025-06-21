import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../login-user-command';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '@selune-backend/dtos';
import { ValidateUserCommand } from '../validate-user-command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private commandBus: CommandBus,
    private jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<AccessToken> {
    const userCredentials = command.userCredentails;

    const user = await this.commandBus.execute(
      new ValidateUserCommand(userCredentials),
    );

    const payload = { sub: user.id, username: user.username };

    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
