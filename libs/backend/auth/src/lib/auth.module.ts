import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@selune-backend/user';
import { AuthApplicationModule } from '@selune-backend/auth-application';

@Module({
  imports: [UserModule, AuthApplicationModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
