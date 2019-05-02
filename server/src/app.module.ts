import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryController } from './controllers/category/category.controller';
import { AppService } from './app.service';
import { PgProvider } from './providers/db-provider';
import { CategoryProvider } from './providers/category.provider';
import { DbCategoryService } from './services/category.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoryController,
  ],
  providers: [
    AppService,
    PgProvider,
    CategoryProvider,
    DbCategoryService,
  ],
})
export class AppModule {}
