import { Controller, Inject, Body, Param, Post, HttpStatus, HttpException, Put, Delete, Get } from '@nestjs/common';
import { COMMENTARY } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Commentary, ICommentary } from 'src/models/commentary.model';
import { ICommentaryApiParams, ICommentaryApiListParams } from 'src/interfaces/commentary-api';

@Controller({ path: 'api/commentary' })
export class CommentaryController {

    constructor(
        @Inject(COMMENTARY) private commentaryRep: Repository<Commentary>,
    ) { }

    @Post('/item/article/:articleId')
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
