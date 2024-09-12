import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitMQProvider } from './rabbitmq.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [RabbitmqService, RabbitMQProvider, ConfigService],
  exports: [RabbitmqService, RabbitMQProvider],
})
export class RabbitMQModule {}
