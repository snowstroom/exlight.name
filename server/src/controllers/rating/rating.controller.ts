import { Controller, Inject, Get, Param, Post } from '@nestjs/common';
import { RATING } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { Rating } from '../../models/rating.model';

@Controller({ path: 'api/rating' })
export class RatingController {
    constructor(
        @Inject(RATING) private ratingRep: Repository<Rating>,
    ) { }

    @Get('/avarage/article/:articleId')
    public async getRating(@Param() params: any) {
        try {

        } catch (err) {

        }
    }

    @Post('/to-rate/article/:id')
    public async toRateArticle(@Param() params: any) {
        try {
            
        } catch (err) {
            
        }
    }
}
