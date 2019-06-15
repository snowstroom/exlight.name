import { NgModule } from '@angular/core';
import { ArticlePage } from './pages/article/article.page';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ArticleItemComponent } from './components/article-item/article-item.component';

@NgModule({
    declarations: [
        ArticlePage,
        CatalogPage,
        ArticleItemComponent
    ],
    exports: [
        ArticlePage,
        CatalogPage,
        ArticleItemComponent
    ]
})
export class ExlightArticleModule { }
