import { Controller, Inject } from '@nestjs/common';
import { ROLE } from 'src/consts/provider-names';
import { Role } from 'src/models/role.model';
import { Repository } from 'typeorm';

@Controller({ path: 'role' })
export class RoleController {
    constructor(@Inject(ROLE) private roleRep: Repository<Role>) { }
}
