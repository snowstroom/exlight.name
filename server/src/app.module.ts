// OTHERS
import { Connection } from 'typeorm';
import { initAccessDefRec, initTestData } from './tools';
import { DB_CONFIG } from './consts/db-conf';
// MODULES
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// PROVIDERS
import { AuthService } from './services/auth.service';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { AuthGuardService } from './guards/auth.guard';
import { MailerService } from './services/mailer.service';
import { RolesAccesService } from './services/roles-access.service';
import { FileService } from './services/file.service';
// MIDLEWARES
import { JwtDecodeMiddleware } from './middleware/jwt-decode.middleware';
// CONTROLLERS
import { AppController } from './app.controller';
import { CategoryController } from './controllers/category/category.controller';
import { UserController } from './controllers/user/user.controller';
import { TagController } from './controllers/tag/tag.controller';
import { RatingController } from './controllers/rating/rating.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AccessController } from './controllers/access/access.controller';
import { RoleController } from './controllers/role/role.controller';
import { ArticleController } from './controllers/article/article.controller';
import { CommentaryController } from './controllers/commentary/commentary.controller';
import { DbUserService } from './services/db-user.service';
import { DbRolesService } from './services/db-roles.service';
import { CryptoService } from './services/crypto.service';
import { DbAccesService } from './services/db-access.service';
import { DbArticleService } from './services/db-article.service';
import { DbCategoryService } from './services/db-category.service';
import { DbCommentaryService } from './services/db-commentary.service';
import { DbRatingService } from './services/db-rating.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_ALIVE_TIME,
      },
    }),
    TypeOrmModule.forRoot(DB_CONFIG),
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
    FileService,
    JwtStrategyService,
    MailerService,
    AuthGuardService,
    RolesAccesService,
    DbAccesService,
    DbArticleService,
    DbCategoryService,
    DbCommentaryService,
    DbRatingService,
    DbRolesService,
    DbUserService,
    CryptoService,
  ],
})
export class AppModule implements NestModule {

  constructor(private readonly connection: Connection) {
    this.init();
  }

  public configure(consumer: MiddlewareConsumer): void {
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

  private async init() {
    await initAccessDefRec(this.connection);
    await initTestData(this.connection);
  }
}
