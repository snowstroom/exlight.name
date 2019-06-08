import { Controller, Inject, Body, Param, Post, HttpStatus, HttpException, Put, Delete, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { COMMENTARY } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Commentary, ICommentary } from 'src/models/commentary.model';
import { ICommentaryApiParams, ICommentaryApiListParams } from 'src/interfaces/commentary-api';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'src/consts/meta-keys';
import { READ, CREATE, UPDATE, DELETE } from 'src/consts/route-entity-map';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { AuthGuardService } from 'src/guards/auth.guard';

@Controller({ path: 'api/commentary' })
@UseGuards(AuthGuardService)
export class CommentaryController {

    constructor(
        @Inject(COMMENTARY) private commentaryRep: Repository<Commentary>,
    ) { }

    @Post('/item/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.commentary)
    public async addCommentary(
        @Body() comment: Partial<ICommentary>,
        @Param() params: ICommentaryApiParams,
    ): Promise<number> {
        try {
            const dbRes = this.commentaryRep.create({
                articleId: params.articleId,
                ...comment,
            });
            return dbRes.id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id/article')
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.commentary)
    public async updateCommentarty(
        @Param() params: ICommentaryApiParams,
        @Body() comment: Partial<ICommentary>,
    ): Promise<void> {
        try {
            const dbRes = await this.commentaryRep.update(params.id, comment);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id/article')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.commentary)
    public async deleteCommentary(@Param() params: ICommentaryApiParams): Promise<void> {
        // I realy want delete comments?
        // Delete if admin, mark as ddelete for users.
        try {
            await this.commentaryRep.delete(params.id);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.commentary)
    public async commentaryList(
        @Param() params: ICommentaryApiListParams,
    ): Promise<ICommentary[]> {
        try {
            const dbRes = this.commentaryRep.find({
                where: {
                    articleId: params.articleId,
                },
                skip: params.start,
                take: params.limit,
            });
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
