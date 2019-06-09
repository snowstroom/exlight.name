import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { AuthGuardService } from './guards/auth.guard';
import { MailerService } from './services/mailer.service';
import { RolesAccesService } from './services/roles-access.service';
import { JwtDecodeMiddleware } from './middleware/jwt-decode.middleware';
import { AccessController } from './controllers/access/access.controller';
import { RoleController } from './controllers/role/role.controller';
import { AccessProvider } from './providers/access.provider';
import { ArticleController } from './controllers/article/article.controller';
import { CommentaryController } from './controllers/commentary/commentary.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_ALIVE_TIME,
      },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    AccessController,
    ArticleController,
    CategoryController,
    CommentaryController,
    RatingController,
    RoleController,
    TagController,
    UserController,
  ],
  providers: [
    AuthService,
    JwtStrategyService,
    AuthGuardService,
    PgProvider,
    ArticleProvider,
    CategoryProvider,
    CommentaryProvider,
    TagProvider,
    RatingProvier,
    RoleProvier,
    UserProvider,
    MailerService,
    RolesAccesService,
    AccessProvider,
    FileService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JwtDecodeMiddleware)
      .forRoutes(
        AccessController,
        AuthController,
        ArticleController,
        CategoryController,
        CommentaryController,
        RatingController,
        RoleController,
        TagController,
        UserController,
      );
  }
}
