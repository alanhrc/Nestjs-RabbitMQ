import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest.js / RabbitMQ')
  .setDescription('Documentação do app.')
  .setVersion('0.0.1')
  .build();
