import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

async function bootstrap() {
  switch (process.env.NODE_ENV) {
    case 'prod': {
      const cnfg = parse(readFileSync(`${__dirname}/configs/prod.env`));
      process.env = {...process.env, ...cnfg };
      break;
    }
    case 'dev': {
      const cnfg = parse(readFileSync(`${__dirname}/configs/dev.env`));
      process.env = {...process.env, ...cnfg };
      break;
    }
    default: throw new Error();
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.EXPRESS_PORT);
}
bootstrap();
