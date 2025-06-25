import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserCredentialsDto } from '@selune-backend/dtos';
import { RegisterUserCommand } from '@selune-backend/user-application';
import { LoginUserCommand } from '@selune-backend/auth-application';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Public()
  @Post('register')
  @Header('content-type', 'application/json')
  @ApiOperation({ summary: 'Register a user with provided credentials.' })
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.commandBus.execute(
      new RegisterUserCommand(createUserDto),
    );
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login in with provided user credentials' })
  async login(@Body() userCredentials: UserCredentialsDto) {
    return this.commandBus.execute(new LoginUserCommand(userCredentials));
  }
}
