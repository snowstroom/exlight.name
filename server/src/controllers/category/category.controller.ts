import { Controller, Get, Post, Put, Delete, Param, Inject, HttpException, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICategory, Category } from '../../models/category.model';
import { CATEGORY } from '../../consts/provider-names';
import { AuthGuardService } from '../../guards/auth.guard';

@Controller({ path: 'api/category' })
@UseGuards(AuthGuardService)
export class CategoryController {
    constructor(@Inject(CATEGORY) private categoryRep: Repository<Category>) { }

    @Get(':id')
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
    public async createCategory(@Body() body: ICategory) {
        try {
            const res = await this.categoryRep.insert(body);
            const [{ id }] = res.identifiers;
            return id;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    public async updateCategory(@Body() body: ICategory, @Param() params: any) {
        try {
            await this.categoryRep.update({ id: params.id }, body);
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    public async deleteCategory(@Param() params: any) {
        try {
            await this.categoryRep.delete({ id: params.id });
            return;
        } catch (err) {
            throw new HttpException({ error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
