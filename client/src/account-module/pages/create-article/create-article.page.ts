import { Component } from '@angular/core';
import { ARTICLES_SECTIONS } from '@account-module/consts/account-sections';

@Component({
    templateUrl: 'create-article.page.html'
})
export class CreateArticlePage {
    public readonly MENU_ITEMS = ARTICLES_SECTIONS;
}
