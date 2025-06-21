import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserCredentialsDto } from '@selune-backend/dtos';
import { RegisterUserCommand } from '@selune-backend/user-application';
import { LoginUserCommand } from '@selune-backend/auth-application';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('register')
  @Header('content-type', 'application/json')
  @ApiOperation({ summary: 'Create a user' })
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.commandBus.execute(
      new RegisterUserCommand(createUserDto),
    );
  }

  @Post('login')
  async login(@Body() userCredentials: UserCredentialsDto) {
    return this.commandBus.execute(new LoginUserCommand(userCredentials));
  }
}
