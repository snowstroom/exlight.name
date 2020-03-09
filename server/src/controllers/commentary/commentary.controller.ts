import {
  Controller,
  Body,
  Param,
  Post,
  HttpStatus,
  HttpException,
  Put,
  Delete,
  Get,
  SetMetadata,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { Commentary } from 'server/src/models/commentary.model';
import {
  META_ACCESS_KEY,
  META_ENTITY_KEY,
  META_PUBLIC_KEY,
} from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, ArticleNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express-serve-static-core';

@Controller({ path: 'api/commentary' })
@UseGuards(AuthGuardService)
export class CommentaryController {
  constructor(
    @InjectRepository(Commentary)
    private commentaryRep: TreeRepository<Commentary>,
  ) {}

  @Post('/item/article/:articleId')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
  public async addCommentary(
    @Body() comment: Partial<ArticleNamespace.IArticleCommentary>,
    @Param() params: ArticleNamespace.ICommentaryApiParams,
    @Req() req: Request,
  ): Promise<number> {
    try {
      let parentComment = null;
      if (comment.parentComment) {
        parentComment = await this.commentaryRep.findOne({
          where: { id: comment.parentComment.id },
        });
      }
      const ent = this.commentaryRep.create({
        article: { id: Number(params.articleId) },
        user: { id: req.authInfo.id },
        ...comment,
      });
      ent.parentComment = parentComment;
      const { id } = await this.commentaryRep.manager.save(ent);
      return id;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id/article/:articleId')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
  public async updateCommentarty(
    @Param() { articleId, id }: ArticleNamespace.ICommentaryApiParams,
    @Body() comment: Partial<ArticleNamespace.IArticleCommentary>,
  ): Promise<void> {
    try {
      await this.commentaryRep.update(id, {
        articleId,
        ...comment,
        edited: true,
      });
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id/article')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.commentary)
  public async deleteCommentary(
    @Param() params: ArticleNamespace.ICommentaryApiParams,
  ): Promise<void> {
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
    @Param() params: ArticleNamespace.ICommentaryApiListParams,
  ): Promise<ArticleNamespace.IArticleCommentary[]> {
    try {
      const { articleId, limit: take, start: skip } = params;
      const comments = await this.commentaryRep.find({
        where: { articleId, parentComment: null },
        take,
        skip,
        relations: ['user'],
      });
      await Promise.all(
        comments.map(rootComment =>
          this.commentaryRep.findDescendantsTree(rootComment),
        ),
      );
      return comments;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
