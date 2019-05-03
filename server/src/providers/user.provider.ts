import { Provider } from '@nestjs/common';
import { DB_CONECTION, USER } from 'src/consts/provider-names';
import { Connection } from 'typeorm';
import { User } from 'src/models/user.model';

export const UserProvider: Provider = {
    provide: USER,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONECTION],
};
