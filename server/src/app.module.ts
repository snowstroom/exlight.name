import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryController } from './controllers/category/category.controller';
import { AppService } from './app.service';
import { PgProvider } from './consts/db-provider';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoryController,
  ],
  providers: [
    AppService,
    PgProvider,
  ],
})
export class AppModule {}
