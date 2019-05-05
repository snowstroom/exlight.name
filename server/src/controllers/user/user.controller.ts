import { Controller, Inject } from '@nestjs/common';
import { USER } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { User } from '../../models/user.model';

@Controller({ path: 'user' })
export class UserController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }
}
