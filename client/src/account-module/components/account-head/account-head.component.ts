import { Component, Input } from '@angular/core';
import { Category } from '@account-module/models/category';
import { ICategory } from '@account-module/interfaces/category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ex-account-head',
    templateUrl: 'account-head.component.html',
    styleUrls: ['account-head.component.scss']
})

export class AccountHeadComponent {
    public categoriesItems: Category[] = [];
    @Input() public catalogName: string;

    public active: number;

    constructor(
        protected router: Router,
        private actRouter: ActivatedRoute
    ) {
        this.actRouter.params.subscribe(params => this.calcDecorator(params.cat));
    }

    @Input() set categories(items: ICategory[]) {
        this.categoriesItems = items.map(i => new Category(i));
        const param = this.router.url.split('/')[2];
        this.calcDecorator(param);
    }

    public calcDecorator(category: string): void {
        this.active = this.categoriesItems.findIndex(item => category === item.route);
    }
}
