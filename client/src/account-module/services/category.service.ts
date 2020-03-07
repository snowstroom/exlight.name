import { Injectable, Injector } from '@angular/core';
import { EnviromentService } from '@app/services/envirement.service';
import { Api } from '@core/classes';
import { ArticleNamespace } from '@share/article.namespace';
import { CategoryApi } from '@account-module/models/api/category.api';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService extends Api {
  constructor(injector: Injector, envSrv: EnviromentService) {
    super(injector, envSrv.API_DOMAIN);
  }

  public async createCategory(
    cat: ArticleNamespace.ICategory,
  ): Promise<number> {
    return this.post(`category`, cat);
  }

  public async deleteCategory(id: number): Promise<void> {
    return this.delete(`category/${id}`);
  }

  public async updateCategory(
    id: number,
    cat: ArticleNamespace.ICategory,
  ): Promise<void> {
    return this.put(`category/${id}`, cat);
  }

  public async getCategory(id: number): Promise<CategoryApi> {
    try {
      const cat = await this.get<ArticleNamespace.ICategory>(`category/${id}`);
      return new CategoryApi(cat);
    } catch (error) {
      throw error;
    }
  }

  public async getAllCategories(): Promise<CategoryApi[]> {
    try {
      const cats = await this.get<ArticleNamespace.ICategory[]>(`category/all`);
      return cats.map(c => new CategoryApi(c));
    } catch (error) {
      throw error;
    }
  }
}
