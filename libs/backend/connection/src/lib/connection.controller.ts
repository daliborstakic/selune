import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@selune-backend/auth';
import { User } from '@selune-backend/entities';

@ApiTags()
@Controller('connection')
export class ConnectionController {
  @ApiOperation({ summary: 'Retrieve all connections for user.' })
  @Get()
  @HttpCode(200)
  async getAllConnections(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Create a connection for the logged in user.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createConnection(@CurrentUser() user: User) {
    return user;
  }
}
