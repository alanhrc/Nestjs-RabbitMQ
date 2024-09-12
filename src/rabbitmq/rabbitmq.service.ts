import { Inject, Injectable } from '@nestjs/common';
import { Channel, Message } from 'amqplib';
import { RabbitMQProviderType } from './rabbitmq.provider';

@Injectable()
export class RabbitmqService {
  private channel: Channel;

  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMQProvider: RabbitMQProviderType,
  ) {}

  async start() {
    if (!this.channel) {
      this.channel = await this.rabbitMQProvider;
    }
  }

  async ack(message: Message) {
    if (!this.channel) throw new Error('Channel is not initialized.');
    this.channel.ack(message);
  }

  async nack(message: Message) {
    if (!this.channel) throw new Error('Channel is not initialized.');
    this.channel.nack(message);
  }

  async consume(queue: string, callback?: (message: Message) => void) {
    await this.start(); // Certifique-se de que o canal está inicializado

    await this.assertQueue(queue);
    this.channel.consume(
      queue,
      (message) => {
        if (message) {
          try {
            callback(message);
            this.ack(message); // Utilize método de reconhecimento centralizado
          } catch (error) {
            console.error('Error processing message:', error);
            this.nack(message);
          }
        }
      },
      { noAck: false },
    );
  }

  async assertQueue(queueName: string) {
    if (!this.channel) throw new Error('Channel is not initialized.');
    try {
      await this.channel.assertQueue(queueName, { durable: true });
    } catch (error) {
      console.error('Error asserting queue:', error);
    }
  }

  async publishInQueue(queue: string, message: string) {
    await this.start(); // Certifique-se de que o canal está inicializado

    // Assegure-se de que a fila exista antes de enviar a mensagem
    await this.assertQueue(queue);

    return this.channel.sendToQueue(queue, Buffer.from(message));
  }
}
