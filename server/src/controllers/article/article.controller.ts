import { Controller, Get, Inject, Param, HttpException, HttpStatus, Post, Delete, Body, Put, SetMetadata, UseGuards, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Atricle } from 'server/src/models/article.model';
import { IArticleApiList, IItemApi } from 'server/src/interfaces/articles-api';
import { RolesAccesService } from 'server/src/services/roles-access.service';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { ApiNamespace, ArticleNamespace, AccessNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: 'api/article' })
@UseGuards(AuthGuardService)
export class ArticleController {

    constructor(
        @InjectRepository(Atricle) private articleRep: Repository<Atricle>,
        private readonly accessSrv: RolesAccesService,
    ) { }

    @Get('/item/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getArticle(@Param() params: IItemApi, ): Promise<ArticleNamespace.IArticle> {
        try {
            if (params.id) {
                const dbRes = await this.articleRep.findOne({ id: params.id });
                return dbRes;
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
    public async getArticleByQuery(@Query() query: IItemApi): Promise<ArticleNamespace.IArticle> {
        try {
            if (query.route) {
                const dbRes = await this.articleRep.findOne({ route: query.route });
                return dbRes;
            } else {
                throw new HttpException({ error: 'Bad parametr' }, HttpStatus.BAD_REQUEST);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getList(@Query() query: IArticleApiList): Promise<ApiNamespace.IPaginationContent<Atricle>> {
        const where = query.category_id ? { categoryId: query.category_id } : {};
        try {
            const dbRes = await this.articleRep.findAndCount({
                where,
                skip: query.start,
                take: query.limit,
            });
            return {
                count: dbRes[1],
                content: dbRes[0],
            };
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/item/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
    public async deleteArticle(@Param() params: IItemApi): Promise<void> {
        try {
            await this.articleRep.delete({ id: params.id });
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/item')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.article)
    public async addArticle(@Body() article: Partial<ArticleNamespace.IArticle>): Promise<number> {
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
    public async updateArticle(@Param() params: IItemApi, @Body() article: Partial<ArticleNamespace.IArticle>): Promise<void> {
        try {
            await this.articleRep.update({ id: params.id }, article);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
