import { Controller, Inject, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { RATING } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { Rating } from '../../models/rating.model';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace } from 'share';

@Controller({ path: 'api/rating' })
@UseGuards(AuthGuardService)
export class RatingController {
    constructor(
        @Inject(RATING) private ratingRep: Repository<Rating>,
    ) { }

    @Get('/avarage/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.rating)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getRating(@Param() params: any) {
        try {
            return;
        } catch (err) {
            return;
        }
    }

    @Post('/to-rate/article/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.rating)
    public async toRateArticle(@Param() params: any) {
        try {
            return;
        } catch (err) {
            return;
        }
    }
}
