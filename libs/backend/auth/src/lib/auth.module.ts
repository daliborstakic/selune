import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@selune-backend/user';
import { AuthApplicationModule } from '@selune-backend/auth-application';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/strategies/local.strategy';

@Module({
  imports: [UserModule, AuthApplicationModule, PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy],
  exports: [],
})
export class AuthModule {}
