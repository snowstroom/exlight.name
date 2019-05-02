import { Controller, Get, Post, Put, Delete, Req, Param } from '@nestjs/common';
import { DbCategoryService } from 'src/services/category.service';
import { ICategory } from 'src/models/category.model';

@Controller()
export class CategoryController {
    constructor(private categorySrv: DbCategoryService) {}

    @Get()
    public async getCategory() {
        console.log('Get category');
    }

    @Post()
    public async createCategory(@Req() request: Request) {
        const category: ICategory = await request.json();
        this.categorySrv.createCategory(category);
    }

    @Put()
    public async updateCategory(@Req() request: Request) {
        const category: ICategory = await request.json();
        this.categorySrv.updateCategory(category);
    }

    @Delete(':id')
    public async deleteCategory(@Param() params: any) {
        this.categorySrv.deleteCategory(params.id);
    }

}
