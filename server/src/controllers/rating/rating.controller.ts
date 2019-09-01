import { Controller, Get, Param, Post, SetMetadata, UseGuards, Req, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rating } from '../../models/rating.model';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, ArticleNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express-serve-static-core';

@Controller({ path: 'api/rating' })
@UseGuards(AuthGuardService)
export class RatingController {
    constructor(
        @InjectRepository(Rating) private ratingRep: Repository<Rating>,
    ) { }

    @Get('/info/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.rating)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getRating(@Param() params: any) {
        try {
            const records = await this.ratingRep.find({ where: { articleId: params.articleId } });
            const ratingInfo: ArticleNamespace.IRatingInfo = {
                avarage: 0,
                min: null,
                max: null,
            };
            if (records.length) {
                ratingInfo.max = records[0].rating;
                ratingInfo.min = records[0].rating;
                let summ = 0;
                records.forEach(r => {
                    if (r.rating > ratingInfo.max) {
                        ratingInfo.max = r.rating;
                    }
                    if (r.rating < ratingInfo.min) {
                        ratingInfo.min = r.rating;
                    }
                    summ += r.rating;
                });
                ratingInfo.avarage = summ / records.length as ArticleNamespace.RatingNumber;
            } else {
                return ratingInfo;
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/to-rate/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.rating)
    public async toRateArticle(@Param() params: any, @Req() req: Request) {
        try {
            const rate = await this.ratingRep.findOne({
                article: { id: params.articleId },
                user: { id: req.authInfo.id },
            });
            if (rate) {
                throw new HttpException({ error: 'Уже оценено' }, HttpStatus.BAD_REQUEST);
            } else {
                await this.ratingRep.insert({
                    article: { id: params.articleId },
                    user: { id: req.authInfo.id },
                    rating: req.body.rating,
                });
            }
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
