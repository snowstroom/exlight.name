import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Category } from '../models/category.model';
import { DB_CONECTION } from '../consts/provider-names';
import { Rating } from '../models/rating.model';
import { Commentary } from '../models/commentary.model';
import { Role } from '../models/role.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { Atricle } from '../models/article.model';
import { Access } from 'src/models/access.model';
import { initDefaultRecords } from 'src/tools/init-default-records';

export const PgProvider: Provider = {
    provide: DB_CONECTION,
    useFactory: async () => {
        const connection = await createConnection({
            type: 'postgres',
            host: '127.0.0.1',
            username: 'postgres',
            password: '2016postgresqlMinsk',
            database: 'exlight_name',
            entities: [
                Atricle,
                Category,
                Commentary,
                Rating,
                Role,
                Tag,
                User,
                Access,
            ],
            synchronize: true,
        });
        await initDefaultRecords(connection);
        return connection;
    },
};
