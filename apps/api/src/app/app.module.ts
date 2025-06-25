import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, User } from '@selune-backend/entities';
import { UserModule } from '@selune-backend/user';
import { AuthModule } from '@selune-backend/auth';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { ConnectionModule } from '@selune-backend/connection';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api/.env',
    }),
    LoggerModule.forRoot(),
    CqrsModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Connection],
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_TOKEN_EXPIRATION') },
      }),
    }),
    UserModule,
    AuthModule,
    ConnectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
