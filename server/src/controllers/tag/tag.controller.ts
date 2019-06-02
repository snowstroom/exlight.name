import { Controller, Inject, Post, Body, HttpStatus, HttpException, Delete, Param, Get } from '@nestjs/common';
import { TAG } from '../../consts/provider-names';
import { Repository, ObjectLiteral } from 'typeorm';
import { Tag } from '../../models/tag.model';
import { IApiList } from 'src/interfaces/base-api';
import { ICreateTagsApi } from 'src/interfaces/tag-api';

@Controller({ path: 'api/tag' })
export class TagController {

    constructor(
        @Inject(TAG) private tagRep: Repository<Tag>,
    ) { }

    @Post()
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
    public async deleteTag(@Param() params: any): Promise<void> {
        try {
            await this.tagRep.delete(params.id);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list')
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
