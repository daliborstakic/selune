import { Module } from '@nestjs/common';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@selune-backend/entities';
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { GetuserByUsernameQueryHandler } from './queries/handlers/get-user-by-username-handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    GetUsersHandler,
    RegisterUserHandler,
    GetuserByUsernameQueryHandler,
  ],
  exports: [],
})
export class UserApplicationModule {}
