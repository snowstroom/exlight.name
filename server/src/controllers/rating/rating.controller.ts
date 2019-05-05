import { Controller, Inject } from '@nestjs/common';
import { RATING } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { Rating } from '../../models/rating.model';

@Controller({ path: 'rating' })
export class RatingController {
    constructor(@Inject(RATING) private ratingRep: Repository<Rating>) { }
}
