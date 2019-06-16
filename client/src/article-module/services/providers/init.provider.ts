import { APP_INITIALIZER, Provider } from '@angular/core';
import { CategoriesService } from '../categories.service';

const initCategories = (srv: CategoriesService): Function => {
    return async (): Promise<void> => {
        const categories = await srv.getCategories();
        srv.initCategories(categories);
    };
}

const init = (srv: CategoriesService) => initCategories(srv);

export const INIT_CATEGORIES: Provider = {
    provide: APP_INITIALIZER,
    useFactory: init,
    deps: [CategoriesService],
    multi: true
};
