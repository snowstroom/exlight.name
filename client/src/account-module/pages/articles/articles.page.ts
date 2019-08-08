import { Component } from '@angular/core';
import { ARTICLES_SECTIONS } from '@account-module/consts/account-sections';

@Component({
    templateUrl: 'articles.page.html'
})
export class ArticlesPage {
    public readonly MENU_ITEMS = ARTICLES_SECTIONS;
}
