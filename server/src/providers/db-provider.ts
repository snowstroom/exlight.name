import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { DB_CONECTION } from 'src/consts/provider-names';
import { Rating } from 'src/models/rating.model';
import { Commentary } from 'src/models/commentary.model';
import { Role } from 'src/models/role.model';
import { Tag } from 'src/models/tag.model';
import { User } from 'src/models/user.model';
import { Atricle } from 'src/models/article.model';

export const PgProvider: Provider = {
    provide: DB_CONECTION,
    useFactory: async () => await createConnection({
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
        ],
        synchronize: true,
    }),
};
