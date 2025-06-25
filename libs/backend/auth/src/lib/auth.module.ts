import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@selune-backend/user';
import { AuthApplicationModule } from '@selune-backend/auth-application';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule, AuthApplicationModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
