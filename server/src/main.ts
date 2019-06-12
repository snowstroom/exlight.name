import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://127.0.0.1:3200',
      'http://localhost:3200',
      'http://127.0.0.1:80',
      'http://localhost:80',
      'http://127.0.0.1',
      'http://localhost',
      'http://192.168.1.200',
    ],
  });
  await app.listen(process.env.EXPRESS_PORT);
}
bootstrap();
