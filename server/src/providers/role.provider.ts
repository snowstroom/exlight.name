import { Provider } from '@nestjs/common';
import { DB_CONECTION, ROLE } from 'src/consts/provider-names';
import { Connection } from 'typeorm';

import { Role } from 'src/models/role.model';

export const RoleProvier: Provider = {
    provide: ROLE,
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: [DB_CONECTION],
};
