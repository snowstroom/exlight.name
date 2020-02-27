import {
  Controller,
  Post,
  Body,
  Delete,
  HttpStatus,
  HttpException,
  Param,
  Put,
  SetMetadata,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import {
  META_ENTITY_KEY,
  META_ACCESS_KEY,
  META_PUBLIC_KEY,
} from 'server/src/consts/meta-keys';
import { AuthGuardService } from 'server/src/guards/auth.guard';
import { AccessNamespace } from 'share';
import { Role } from 'server/src/models/role.model';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: '/api/role' })
@UseGuards(AuthGuardService)
export class RoleController {
  constructor(@InjectRepository(Role) private roleRep: Repository<Role>) {}

  @Get('/list')
  @SetMetadata(META_PUBLIC_KEY, true)
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.E_ENTITY_TYPES.role)
  public async getList(): Promise<any> {
    try {
      const dbRes = await this.roleRep.find({ relations: ['access'] });
      return dbRes;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
  public async addRole(
    @Body() role: Partial<AccessNamespace.IRole>,
  ): Promise<ObjectLiteral> {
    try {
      const roleInst = this.roleRep.create(role);
      const result = await this.roleRep.insert(roleInst);
      const [id] = result.identifiers;
      return id;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
  public async updateRole(
    @Param() params: any,
    @Body() role: Partial<AccessNamespace.IRole>,
  ): Promise<void> {
    try {
      await this.roleRep.update(params.id, role);
      return;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.role)
  public async deleteRole(@Param() params: any): Promise<void> {
    try {
      await this.roleRep.delete({ id: params.id });
      return;
    } catch (err) {
      throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
