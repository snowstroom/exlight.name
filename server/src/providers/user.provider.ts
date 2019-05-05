import { Provider } from '@nestjs/common';
import { DB_CONECTION, USER } from '../consts/provider-names';
import { Connection } from 'typeorm';
import { User } from '../models/user.model';

export const UserProvider: Provider = {
    provide: USER,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONECTION],
};
