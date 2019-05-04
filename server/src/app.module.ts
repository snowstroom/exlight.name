import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoryController } from './controllers/category/category.controller';
import { PgProvider } from './providers/db-provider';
import { ArticleProvider } from './providers/article.provider';
import { CommentaryProvider } from './providers/commentary.provider';
import { TagProvider } from './providers/tag.provider';
import { RoleProvier } from './providers/role.provider';
import { UserController } from './controllers/user/user.controller';
import { TagController } from './controllers/tag/tag.controller';
import { RatingController } from './controllers/rating/rating.controller';
import { CategoryProvider } from './providers/category.provider';
import { RatingProvier } from './providers/rating.provider';
import { UserProvider } from './providers/user.provider';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoryController,
    UserController,
    TagController,
    RatingController,
  ],
  providers: [
    PgProvider,
    ArticleProvider,
    CategoryProvider,
    CommentaryProvider,
    TagProvider,
    RatingProvier,
    RoleProvier,
    UserProvider,
  ],
})
export class AppModule {}
