import {
  Controller,
  Get,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  Body,
  Put,
  SetMetadata,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from 'server/src/models/article.model';
import { RolesAccessService } from 'server/src/services/roles-access.service';
import {
  META_ACCESS_KEY,
  META_ENTITY_KEY,
  META_PUBLIC_KEY,
} from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { ApiNamespace, ArticleNamespace, AccessNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: 'api/article' })
@UseGuards(AuthGuardService)
export class ArticleController {
  constructor(
    @InjectRepository(Article) private articleRep: Repository<Article>,
    private readonly accessSrv: RolesAccessService,
  ) {}

  @Get('/item/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  @SetMetadata(META_PUBLIC_KEY, true)
  public async getArticle(
    @Param() params: ArticleNamespace.IItemApi,
  ): Promise<ArticleNamespace.IArticle> {
    const { id, route } = params;
    try {
      if (id) {
        const article = await this.articleRep.findOne({ id });
        return article;
      } else {
        throw new HttpException({ error: 'Bad id' }, HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/item')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  @SetMetadata(META_PUBLIC_KEY, true)
  public async getArticleByQuery(
    @Query() query: ArticleNamespace.IItemApi,
  ): Promise<ArticleNamespace.IArticle> {
    try {
      if (query.route) {
        const dbRes = await this.articleRep.findOne(
          { route: query.route },
          {
            relations: ['tags'],
          },
        );
        return dbRes as any;
      } else {
        throw new HttpException(
          { error: 'Bad parameter' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/list')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  @SetMetadata(META_PUBLIC_KEY, true)
  public async getList(
    @Query() query: ArticleNamespace.IArticleApiList,
  ): Promise<ApiNamespace.IPaginationContent<Article>> {
    const { category_id, limit, start } = query;
    try {
      const [content, count] = await this.articleRep.findAndCount({
        where: category_id ? { category_id } : {},
        skip: start,
        take: limit,
      });
      return { count, content };
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/item/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  public async deleteArticle(
    @Param() params: ArticleNamespace.IItemApi,
  ): Promise<void> {
    try {
      await this.articleRep.delete({ id: params.id });
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/item')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  public async addArticle(
    @Body() article: Partial<ArticleNamespace.IArticle>,
  ): Promise<number> {
    try {
      const dbRes = await this.articleRep.create(article);
      return dbRes.id;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/item/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
  public async updateArticle(
    @Param() params: ArticleNamespace.IItemApi,
    @Body() article: Partial<ArticleNamespace.IArticle>,
  ): Promise<void> {
    try {
      await this.articleRep.update({ id: params.id }, article);
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
