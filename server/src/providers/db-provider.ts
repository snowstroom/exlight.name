import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Category } from 'src/models/category.model';

export const PgProvider: Provider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
        type: 'postgres',
        host: '127.0.0.1',
        username: 'postgres',
        password: '2016postgresqlMinsk',
        database: 'exlight_name',
        entities: [Category],
        synchronize: true,
    }),
};
