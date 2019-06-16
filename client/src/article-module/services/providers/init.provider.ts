import { APP_INITIALIZER, Provider } from '@angular/core';
import { CategoriesService } from '../categories.service';

export async function initCategories(categoriesSrv: CategoriesService): Promise<void> {
    const categories = await categoriesSrv.getCategories();
    categoriesSrv.initCategories(categories);
}

export const INIT_CATEGORIES: Provider = {
    provide: APP_INITIALIZER,
    useFactory: initCategories,
    deps: [CategoriesService],
    multi: true
};
