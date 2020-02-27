import { Controller, Body, Param, Post, HttpStatus, HttpException, Put, Delete, Get, SetMetadata, UseGuards, Req } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { Commentary } from 'server/src/models/commentary.model';
import { ICommentaryApiParams, ICommentaryApiListParams } from 'server/src/interfaces/commentary-api';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, ArticleNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express-serve-static-core';

@Controller({ path: 'api/commentary' })
@UseGuards(AuthGuardService)
export class CommentaryController {

    constructor(
        @InjectRepository(Commentary) private commentaryRep: TreeRepository<Commentary>,
    ) { }

    @Post('/item/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
    public async addCommentary(
        @Body() comment: Partial<ArticleNamespace.IArticleCommentary>,
        @Param() params: ICommentaryApiParams,
        @Req() req: Request,
    ): Promise<number> {
        try {
            console.warn(comment, params);
            const dbRes = await this.commentaryRep.insert({
                article: { id: Number(params.articleId) },
                user: { id: req.authInfo.id },
                ...comment,
            });
            console.warn(dbRes);
            return dbRes.identifiers[0].id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id/article')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
    public async updateCommentarty(
        @Param() params: ICommentaryApiParams,
        @Body() comment: Partial<ArticleNamespace.IArticleCommentary>,
    ): Promise<void> {
        try {
            const dbRes = await this.commentaryRep.update(params.id, comment);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id/article')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
    public async deleteCommentary(@Param() params: ICommentaryApiParams): Promise<void> {
        // I realy want delete comments?
        // Delete if admin, mark as delete for users.
        try {
            await this.commentaryRep.delete(params.id);
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/list/article/:articleId')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async commentaryList(
        @Param() params: ICommentaryApiListParams,
    ): Promise<ArticleNamespace.IArticleCommentary[]> {
        try {
            const dbRes = await this.commentaryRep.find({
                where: { articleId: params.articleId },
                skip: params.start,
                take: params.limit,
                relations: ['user'],
            });
            const res = await this.commentaryRep.createDescendantsQueryBuilder('commentary', 'comments', null)
                .where('commentary.articleId = :articleId', { articleId: params.articleId })
                .andWhere(`commentary.type = 'secondary'`)
                .leftJoinAndSelect('commentary.user', 'user')
                .select([
                    'commentary.id',
                    'commentary.comment',
                    'commentary.updateDate',
                    'commentary.createDate',
                    'user.id',
                    'user.firstname',
                    'user.secondname',
                ])
                .skip(params.limit)
                .take(params.start)
                .getMany();
            console.warn(res);
            return dbRes;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
