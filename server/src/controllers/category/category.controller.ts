import { Controller, Get, Post, Put, Delete, Param, Inject, HttpException, Body, HttpStatus, UseGuards, SetMetadata } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICategory, Category } from '../../models/category.model';
import { CATEGORY } from '../../consts/provider-names';
import { AuthGuardService } from '../../guards/auth.guard';
import { E_ENTITY_TYPES } from 'src/enums/entity-types';
import { CREATE, READ, UPDATE, DELETE } from 'src/consts/route-entity-map';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'src/consts/meta-keys';

@Controller({ path: 'api/category' })
@UseGuards(AuthGuardService)
export class CategoryController {
    constructor(
        @Inject(CATEGORY) private categoryRep: Repository<Category>,
    ) { }

    @Get('/:id')
    @SetMetadata(META_ACCESS_KEY, READ)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.category)
    @SetMetadata(META_PUBLIC_KEY, true)
    public async getCategory(@Param() params: any) {
        try {
            return params.id === 'all' ?
                this.categoryRep.find() :
                this.categoryRep.findOne({ id: params.id });
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @SetMetadata(META_ACCESS_KEY, CREATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.category)
    public async createCategory(@Body() body: ICategory) {
        try {
            const res = await this.categoryRep.insert(body);
            const [{ id }] = res.identifiers;
            return id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    @SetMetadata(META_ACCESS_KEY, UPDATE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.category)
    public async updateCategory(@Body() body: ICategory, @Param() params: any) {
        try {
            await this.categoryRep.update({ id: params.id }, body);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, DELETE)
    @SetMetadata(META_ENTITY_KEY, E_ENTITY_TYPES.category)
    public async deleteCategory(@Param() params: any) {
        try {
            await this.categoryRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
