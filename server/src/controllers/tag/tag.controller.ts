import { Controller, Inject } from '@nestjs/common';
import { TAG } from '../../consts/provider-names';
import { Repository } from 'typeorm';
import { Tag } from '../../models/tag.model';

@Controller({ path: 'tag' })
export class TagController {
    constructor(@Inject(TAG) private tagRep: Repository<Tag>) { }
}
