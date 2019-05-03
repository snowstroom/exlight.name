import { Provider } from '@nestjs/common';
import { RATING, DB_CONECTION } from 'src/consts/provider-names';
import { Connection } from 'typeorm';
import { Rating } from 'src/models/rating.model';

export const RatingProvier: Provider = {
    provide: RATING,
    useFactory: (connection: Connection) => connection.getRepository(Rating),
    inject: [DB_CONECTION],
};
