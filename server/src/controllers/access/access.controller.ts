import { Controller, Inject, Post, Body, HttpStatus, HttpException, Put, Param, Delete } from '@nestjs/common';
import { ACCESS } from 'src/consts/provider-names';
import { Repository, ObjectLiteral } from 'typeorm';
import { Access, IAccess } from 'src/models/access.model';

@Controller({ path: '/api/access'})
export class AccessController {
    constructor(@Inject(ACCESS) private accessRep: Repository<Access>) {}

    @Post()
    public async addAccess(@Body() access: Partial<IAccess>): Promise<ObjectLiteral> {
        try {
            const accessInst = this.accessRep.create(access);
            const dbRes = await this.accessRep.insert(accessInst);
            const [ id ] = dbRes.identifiers;
            return id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    public async updateAccess(@Body() access: Partial<IAccess>, @Param() params: any) {
        try {
            await this.accessRep.update(params.id, access);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    public async deleteAccess(@Param() params: any): Promise<void> {
        try {
            await this.accessRep.delete(params.id);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
