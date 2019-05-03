import { Controller, Inject } from '@nestjs/common';
import { COMMENTARY } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Commentary } from 'src/models/commentary.model';

@Controller({ path: 'commentary' })
export class CommentaryController {
    constructor(@Inject(COMMENTARY) private commentaryRep: Repository<Commentary>) { }

}
