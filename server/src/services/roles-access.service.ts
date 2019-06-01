import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'src/models/role.model';

@Injectable()
export class RolesAccesService {

    constructor(@Inject() private readonly rolesRep: Repository<Role>) { }
}
