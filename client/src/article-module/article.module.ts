import { ARTICLE_ROUTES } from './routes';
import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from '@common-module/common.module';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// PROVIDERS
import { MARKDOWN_PROVIDER } from './services/providers/markdown.provider';
import { INIT_CATEGORIES } from './services/providers/init.provider';
// COMPONENTS
import { ArticlePage } from './pages/article/article.page';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { CommentControlComponent } from './components/comment-control/comment-control.component';
import { CommentaryItemComponent } from './components/comment-item/comment-item.component';

@NgModule({
  imports: [
    ExlightCommonModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild(ARTICLE_ROUTES),
    MarkdownModule.forRoot({ markedOptions: MARKDOWN_PROVIDER }),
  ],
  declarations: [
    ArticlePage,
    CatalogPage,
    ArticleItemComponent,
    CommentControlComponent,
    CommentaryItemComponent
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
