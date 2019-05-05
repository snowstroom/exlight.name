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
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './classes/secrets';
import { AuthService } from './services/auth.service';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { TOKEN_ALIVE_TIME } from './classes/configs';
import { AuthGuardService } from './guards/auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: TOKEN_ALIVE_TIME,
      },
    }),
  ],
  controllers: [
    AuthController,
    AppController,
    CategoryController,
    UserController,
    TagController,
    RatingController,
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
  ],
})
export class AppModule {}
