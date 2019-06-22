import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Category } from 'server/src/models/category.model';
import { DB_CONECTION, CATEGORY } from 'server/src/consts/provider-names';

export const CategoryProvider: Provider = {
    provide: CATEGORY,
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: [DB_CONECTION],
};
