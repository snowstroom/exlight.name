import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Atricle } from 'server/src/models/article.model';
import { ARTICLE, DB_CONECTION } from 'server/src/consts/provider-names';

export const ArticleProvider: Provider = {
    provide: ARTICLE,
    useFactory: (connection: Connection) => connection.getRepository(Atricle),
    inject: [DB_CONECTION],
};
