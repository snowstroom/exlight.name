import { Provider } from '@nestjs/common';
import { TAG, DB_CONECTION } from 'src/consts/provider-names';
import { Connection } from 'typeorm';
import { Tag } from 'src/models/tag.model';

export const TagProvider: Provider = {
    provide: TAG,
    useFactory: (connection: Connection) => connection.getRepository(Tag),
    inject: [DB_CONECTION],
};
