import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @ApiOperation({ summary: 'Return Hello World!' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Send message to queue' })
  @ApiResponse({ status: 201 })
  @Post('send')
  async sendMessage() {
    const queue = 'test_queue';
    const message = 'Hello, RabbitMQ!';
    await this.rabbitmqService.publishInQueue(queue, message);
    return 'Message sent!';
  }

  @ApiOperation({ summary: 'Consume message from queue' })
  @ApiResponse({ status: 200 })
  @Get('consume')
  async consumeMessages() {
    const queue = 'test_queue';
    await this.rabbitmqService.consume(queue, (message) => {
      console.log('Received message:', message.content.toString());
    });
    return 'Started consuming messages';
  }
}
