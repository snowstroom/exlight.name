import {
  Controller,
  Inject,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Put,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { Access } from 'server/src/models/access.model';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'server/src/consts/meta-keys';
import { AccessNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: '/api/access' })
@UseGuards(AuthGuardService)
export class AccessController {
  constructor(
    @InjectRepository(Access) private accessRep: Repository<Access>,
  ) {}

  @Post()
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.access)
  public async addAccess(
    @Body() access: DeepPartial<Access>,
  ): Promise<ObjectLiteral> {
    try {
      const accessInst = this.accessRep.create(access);
      const dbRes = await this.accessRep.insert(accessInst);
      const [id] = dbRes.identifiers;
      return id;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.access)
  public async updateAccess(
    @Body() access: DeepPartial<Access>,
    @Param() params: any,
  ) {
    try {
      await this.accessRep.update(params.id, access);
      return;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.access)
  public async deleteAccess(@Param() params: any): Promise<void> {
    try {
      await this.accessRep.delete(params.id);
      return;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
