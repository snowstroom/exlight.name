import { Controller, Inject } from '@nestjs/common';
import { RATING } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Rating } from 'src/models/rating.model';

@Controller({ path: 'rating' })
export class RatingController {
    constructor(@Inject(RATING) private ratingRep: Repository<Rating>) { }
}
