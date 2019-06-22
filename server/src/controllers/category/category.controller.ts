import { Controller, Get, Post, Put, Delete, Param, HttpException, Body, HttpStatus, UseGuards, SetMetadata } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../../models/category.model';
import { AuthGuardService } from '../../guards/auth.guard';
import { META_ACCESS_KEY, META_ENTITY_KEY, META_PUBLIC_KEY } from 'server/src/consts/meta-keys';
import { ArticleNamespace, AccessNamespace } from 'share';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: 'api/category' })
@UseGuards(AuthGuardService)
export class CategoryController {
    constructor(
        @InjectRepository(Category) private categoryRep: Repository<Category>,
    ) { }

    @Get('/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.READ)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.category)
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
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.category)
    public async createCategory(@Body() body: ArticleNamespace.ICategory) {
        try {
            const res = await this.categoryRep.insert(body);
            const [{ id }] = res.identifiers;
            return id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.UPDATE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.category)
    public async updateCategory(@Body() body: ArticleNamespace.ICategory, @Param() params: any) {
        try {
            await this.categoryRep.update({ id: params.id }, body);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id')
    @SetMetadata(META_ACCESS_KEY, AccessNamespace.DELETE)
    @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.category)
    public async deleteCategory(@Param() params: any) {
        try {
            await this.categoryRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
