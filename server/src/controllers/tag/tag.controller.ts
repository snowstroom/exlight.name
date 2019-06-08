import { Controller, Inject, Post, Body, HttpStatus, HttpException, Delete, Param, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { TAG } from '../../consts/provider-names';
import { Repository, ObjectLiteral } from 'typeorm';
import { Tag } from '../../models/tag.model';
import { IApiList } from 'src/interfaces/base-api';
import { ICreateTagsApi } from 'src/interfaces/tag-api';
import { CREATE, DELETE, READ } from 'src/consts/access';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'src/consts/meta-keys';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: 'api/tag' })
@UseGuards(AuthGuardService)
export class TagController {

    constructor(
        @Inject(TAG) private tagRep: Repository<Tag>,
    ) { }

    @Post()
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.tag)
    public async addTags(@Body() req: ICreateTagsApi): Promise<ObjectLiteral[]> {
        try {
            if (Array.isArray(req.tags)) {
                const tagsInst = req.tags.map(t => this.tagRep.create({ name: t.toLowerCase() }));
                const dbRes = await this.tagRep.insert(tagsInst);
                return dbRes.identifiers;
            }
            throw new HttpException({ err: ''}, HttpStatus.BAD_REQUEST);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.tag)
    public async deleteTag(@Param() params: any): Promise<void> {
        try {
            await this.tagRep.delete(params.id);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.tag)
    public async tagList(@Param() params: IApiList) {
        try {
            const dbRes = await this.tagRep.find({
                skip: params.start,
                take: params.limit,
            });
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
