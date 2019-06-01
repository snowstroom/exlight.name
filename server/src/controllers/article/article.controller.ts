import { Controller, Get, Inject, Param, HttpException, HttpStatus, Post, Delete, Body, Put } from '@nestjs/common';
import { ARTICLE, COMMENTARY } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Atricle, IArticle } from 'src/models/article.model';
import { IArticleApiList, IItemApi } from 'src/interfaces/articles-api';

@Controller({ path: 'api/article' })
export class ArticleController {

    constructor(@Inject(ARTICLE) private articleRep: Repository<Atricle>) { }

    @Get('/item/:id')
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
    public async deleteArticle(@Param() params: IItemApi): Promise<void> {
        try {
            await this.articleRep.delete({ id: params.id });
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/item')
    public async addArticle(@Body() article: Partial<IArticle>): Promise<number> {
        try {
            const dbRes = await this.articleRep.create(article);
            return dbRes.id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/item/:id')
    public async updateArticle(@Param() params: IItemApi, @Body() article: Partial<IArticle>): Promise<void> {
        try {
            await this.articleRep.update({ id: params.id }, article);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
