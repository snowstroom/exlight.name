import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Category } from 'src/models/category.model';

export const CategoryProvider: Provider = {
    provide: 'CATEGORY',
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: ['DATABASE_CONNECTION'],
};
