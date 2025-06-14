import { Module } from '@nestjs/common';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@selune-backend/entities';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetuserByUsernameQueryHandler } from './queries/handlers/get-user-by-username-handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    GetUsersHandler,
    CreateUserHandler,
    GetuserByUsernameQueryHandler,
  ],
  exports: [],
})
export class UserApplicationModule {}
