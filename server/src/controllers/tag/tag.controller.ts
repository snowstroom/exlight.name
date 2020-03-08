import {
  Controller,
  Inject,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Delete,
  Param,
  Get,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Repository, ObjectLiteral } from 'typeorm';
import { Tag } from '../../models/tag.model';
import { ICreateTagsApi } from 'server/src/interfaces/tag-api';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace, ApiNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: 'api/tag' })
@UseGuards(AuthGuardService)
export class TagController {
  constructor(@InjectRepository(Tag) private tagRep: Repository<Tag>) {}

  @Post()
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.tag)
  public async addTags(@Body() req: ICreateTagsApi): Promise<ObjectLiteral[]> {
    try {
      if (Array.isArray(req.tags)) {
        const tagsInst = req.tags.map(t =>
          this.tagRep.create({ name: t.toLowerCase() }),
        );
        const dbRes = await this.tagRep.insert(tagsInst);
        return dbRes.identifiers;
      }
      throw new HttpException({ err: '' }, HttpStatus.BAD_REQUEST);
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.tag)
  public async deleteTag(@Param() params: { id: number }): Promise<void> {
    try {
      await this.tagRep.delete(params.id);
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/list')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.tag)
  public async tagList(@Param() params: ApiNamespace.IApiList) {
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
