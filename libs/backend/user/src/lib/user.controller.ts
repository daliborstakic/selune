import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({summary: 'Get all users'})
  @HttpCode(200)
  findAllUsers() {
    return this.userService.findAll();
  }
}
