import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@selune-backend/user-application';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @HttpCode(200)
  findAllUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }
}
