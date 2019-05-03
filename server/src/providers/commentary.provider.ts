import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { COMMENTARY, DB_CONECTION } from 'src/consts/provider-names';
import { Commentary } from 'src/models/commentary.model';

export const CommentaryProvider: Provider = {
    provide: COMMENTARY,
    useFactory: (connection: Connection) => connection.getRepository(Commentary),
    inject: [DB_CONECTION],
};
