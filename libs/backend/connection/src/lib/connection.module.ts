import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConnectionController } from './connection.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ConnectionController],
  providers: [],
  exports: [],
})
export class ConnectionModule {}
