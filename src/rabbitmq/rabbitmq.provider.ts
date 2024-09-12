import { ConfigService } from '@nestjs/config';
import { connect, Channel, Connection } from 'amqplib';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_PROVIDER',
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('RABBITMQ_URI');
    const conn: Connection = await connect(uri);
    const channel: Channel = await conn.createChannel();
    return channel;
  },
  inject: [ConfigService],
};

export type RabbitMQProviderType = Promise<Channel>;
