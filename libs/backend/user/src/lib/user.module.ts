import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserApplicationModule } from '@selune-backend/user-application';

@Module({
  imports: [CqrsModule, UserApplicationModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
