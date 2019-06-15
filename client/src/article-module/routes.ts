import { Routes } from '@angular/router';
import { ArticlePage } from './pages/article/article.page';
import { CatalogPage } from './pages/catalog/catalog.page';

export const ARTICLE_ROUTES: Routes = [
    {
        path: 'catalog',
        pathMatch: 'full',
        redirectTo: 'catalog/all/page/1'
    }, {
        path: 'catalog/:cat/page/:page',
        component: CatalogPage
    }, {
        path: 'article/:article',
        component: ArticlePage
    },
];
