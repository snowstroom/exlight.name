import { Controller, Inject, Body, Param, Post, HttpStatus, HttpException, Put, Delete, Get } from '@nestjs/common';
import { COMMENTARY } from 'src/consts/provider-names';
import { Repository } from 'typeorm';
import { Commentary, ICommentary } from 'src/models/commentary.model';

@Controller({ path: 'api/commentary' })
export class CommentaryController {
    constructor(@Inject(COMMENTARY) private commentaryRep: Repository<Commentary>) { }

    @Post('/item/article/:id')
    public async addCommentary(@Body() comment: Partial<ICommentary>, @Param() params: any): Promise<number> {
        try {
            const dbRes = this.commentaryRep.create({
                articleId: params.id,
                ...comment,
            });
            return dbRes.id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id/article')
    public async updateCommentarty(@Param() params: any, @Body() comment: Partial<ICommentary>): Promise<void> {
        return;
    }

    @Delete('/:id/article')
    public async deleteCommentary(@Param() params: any): Promise<void> {
        return;
    }

    @Get('/list/article/:id')
    public async commentaryList(@Param() params: any): Promise<ICommentary[]> {
        try {
            const dbRes = this.commentaryRep.find({
                where: {
                    articleId: params.id,
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
