import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from 'common-module/common.module';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
// PROVIDERS
import { MARKDOWN_PROVIDER } from './services/providers/markdown.provider';
// COMPONENTS
import { ArticlePage } from './pages/article/article.page';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { INIT_CATEGORIES } from './services/providers/init.provider';

@NgModule({
  imports: [
    ExlightCommonModule,
    CommonModule,
    BrowserModule,
    RouterModule,
    MarkdownModule.forRoot({ markedOptions: MARKDOWN_PROVIDER }),
  ],
  declarations: [
    ArticlePage,
    CatalogPage,
    ArticleItemComponent
  ],
  providers: [
    INIT_CATEGORIES
  ],
  exports: [
    ArticlePage,
    CatalogPage,
    ArticleItemComponent
  ]
})
export class ExlightArticleModule { }
