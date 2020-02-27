import { ArticlePage } from './pages/article/article.page';
import { CatalogPage } from './pages/catalog/catalog.page';
import { IExlightRoute } from '@app/interfaces/exlight-router';

export const ARTICLE_ROUTES: IExlightRoute[] = [
  {
    path: 'catalog',
    pathMatch: 'full',
    redirectTo: 'catalog/all/page/1',
    data: {
      showAside: true,
    },
  },
  {
    path: 'catalog/:cat/page/:page',
    component: CatalogPage,
    data: {
      showAside: true,
    },
  },
  {
    path: 'article/:article',
    component: ArticlePage,
    data: {
      showAside: true,
    },
  },
];
