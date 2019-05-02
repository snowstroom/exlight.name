import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';

export const PgProvider: Provider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
        type: 'postgres',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'test',
        database: 'test',
        entities: [`${__dirname}//../**/*.entity{.ts,.js}`],
        synchronize: true,
    }),
};
