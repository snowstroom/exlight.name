import { Controller, Inject, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RATING } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { Rating } from '../../models/rating.model';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'src/consts/meta-keys';
import { READ, CREATE } from 'src/consts/route-entity-map';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: 'api/rating' })
@UseGuards(AuthGuardService)
export class RatingController {
    constructor(
        @Inject(RATING) private ratingRep: Repository<Rating>,
    ) { }

    @Get('/avarage/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.rating)
    public async getRating(@Param() params: any) {
        try {
            return;
        } catch (err) {
            return;
        }
    }

    @Post('/to-rate/article/:id')
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.rating)
    public async toRateArticle(@Param() params: any) {
        try {
            return;
        } catch (err) {
            return;
        }
    }
}
