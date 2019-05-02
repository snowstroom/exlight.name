import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category, ICategory } from 'src/models/category.model';

@Injectable()
export class DbCategoryService {
    constructor(@Inject('CATEGORY') private categoryRep: Repository<Category>) { }

    public async getCategories() {
        return this.categoryRep.find();
    }

    public async createCategory(category: Partial<ICategory>) {
        return this.categoryRep.create(category);
    }

    public async updateCategory(category: Partial<ICategory>) {
        this.categoryRep.update({
            id: category.id,
        }, category);
    }

    public async deleteCategory(id: number) {
        this.categoryRep.delete({ id });
    }
}
