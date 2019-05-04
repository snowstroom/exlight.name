import { Controller, Inject } from '@nestjs/common';
import { USER } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';

@Controller({ path: 'user' })
export class UserController {
    constructor(@Inject(USER) private userRep: Repository<User>) { }
}
