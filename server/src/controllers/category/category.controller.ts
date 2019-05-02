import { Controller, Get, Post, Put, Delete, Req, Param } from '@nestjs/common';
import { DbCategoryService } from 'src/services/category.service';
import { ICategory } from 'src/models/category.model';
import { Request } from 'express';

@Controller({ path: 'category' })
export class CategoryController {
    constructor(private categorySrv: DbCategoryService) { }

    @Get()
    public async getCategory() {
        return;
    }

    @Post()
    public async createCategory(@Req() request: Request) {
        const result = this.categorySrv.createCategory(request.body as ICategory);
        return result;
    }

    @Put()
    public async updateCategory(@Req() request: Request) {
        this.categorySrv.updateCategory(request.body as ICategory);
    }

    @Delete(':id')
    public async deleteCategory(@Param() params: any) {
        this.categorySrv.deleteCategory(params.id);
    }

}
