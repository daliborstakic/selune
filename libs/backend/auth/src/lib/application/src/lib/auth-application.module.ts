import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateUserHandler } from './commands/handlers/validate-user-handler';
import { LoginUserHandler } from './commands/handlers/login-user-handler';

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [],
  providers: [ValidateUserHandler, LoginUserHandler],
  exports: [],
})
export class AuthApplicationModule {}
