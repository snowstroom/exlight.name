import { Controller, Inject, Post, Body, HttpStatus, HttpException, Put, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { ACCESS } from 'src/consts/provider-names';
import { Repository, ObjectLiteral } from 'typeorm';
import { Access, IAccess } from 'src/models/access.model';
import { AuthGuardService } from 'src/guards/auth.guard';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'src/consts/meta-keys';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { CREATE, UPDATE, DELETE } from 'src/consts/route-entity-map';

@Controller({ path: '/api/access' })
@UseGuards(AuthGuardService)
export class AccessController {

    constructor(
        @Inject(ACCESS) private accessRep: Repository<Access>,
    ) { }

    @Post()
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.access)
    public async addAccess(@Body() access: Partial<IAccess>): Promise<ObjectLiteral> {
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
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.access)
    public async updateAccess(@Body() access: Partial<IAccess>, @Param() params: any) {
        try {
            await this.accessRep.update(params.id, access);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.access)
    public async deleteAccess(@Param() params: any): Promise<void> {
        try {
            await this.accessRep.delete(params.id);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
