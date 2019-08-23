import { Component } from '@angular/core';
import { ARTICLES_SECTIONS } from '@account-module/consts/account-sections';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
    templateUrl: 'create-article.page.html'
})
export class CreateArticlePage {
    public readonly MENU_ITEMS = ARTICLES_SECTIONS;
    public name = 'Angular 6';
    public htmlContent = '';

    public form = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        route: new FormControl(null, Validators.required),
        categoryId: new FormControl(null, Validators.required),
        tags: new FormArray([])
    });

    public config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        toolbarPosition: 'top',
        defaultFontName: 'Times New Roman',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };
}
