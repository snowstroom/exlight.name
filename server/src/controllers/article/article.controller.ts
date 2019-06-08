import { Controller, Get, Inject, Param, HttpException, HttpStatus, Post, Delete, Body, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { ARTICLE } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Atricle, IArticle } from 'src/models/article.model';
import { IArticleApiList, IItemApi } from 'src/interfaces/articles-api';
import { RolesAccesService } from 'src/services/roles-access.service';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { READ, DELETE, UPDATE } from 'src/consts/route-entity-map';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'src/consts/meta-keys';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: 'api/article' })
@UseGuards(AuthGuardService)
export class ArticleController {

    constructor(
        @Inject(ARTICLE) private articleRep: Repository<Atricle>,
        private readonly accessSrv: RolesAccesService,
    ) { }

    @Get('/item/:id')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.article)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getArticle(@Param() params: IItemApi): Promise<IArticle> {
        try {
            if (params.id) {
                const dbRes = await this.articleRep.findOne({ id: params.id });
                return dbRes;
            } else if (params.route) {
                const dbRes = await this.articleRep.findOne({ route: params.route });
                return dbRes;
            } else {
                throw new HttpException({ error: 'Bad parametr' }, HttpStatus.BAD_REQUEST);
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.article)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getList(@Param() params: IArticleApiList) {
        try {
            const dbRes = await this.articleRep.find({
                where: {
                    categoryId: params.category_id,
                },
                skip: params.start,
                take: params.limit,
            });
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/item/:id')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.article)
    public async deleteArticle(@Param() params: IItemApi): Promise<void> {
        try {
            await this.articleRep.delete({ id: params.id });
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/item')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.article)
    public async addArticle(@Body() article: Partial<IArticle>): Promise<number> {
        try {
            const dbRes = await this.articleRep.create(article);
            return dbRes.id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/item/:id')
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.article)
    public async updateArticle(@Param() params: IItemApi, @Body() article: Partial<IArticle>): Promise<void> {
        try {
            await this.articleRep.update({ id: params.id }, article);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
