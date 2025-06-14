import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@selune-backend/dtos';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @HttpCode(200)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  @Header('content-type', 'application/json')
  @ApiOperation({ summary: 'Create a user' })
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.createAsync(createUserDto);
  }
}
