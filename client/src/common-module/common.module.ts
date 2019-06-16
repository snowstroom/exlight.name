import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// COMPONENTS
import { LineSpinnerComponent } from './components/spinners/line-spinner/line-spinner.component';
import { SpinnerComponent } from './components/spinners/text-spinner/spinner.component';
import { RatingComponent } from './components/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FontAwesomeModule,
        RouterModule
    ],
    declarations: [
        LineSpinnerComponent,
        SpinnerComponent,
        RatingComponent,
        PaginationComponent,
        CatalogMenuComponent
    ],
    exports: [
        LineSpinnerComponent,
        SpinnerComponent,
        RatingComponent,
        PaginationComponent,
        CatalogMenuComponent
    ]
})
export class ExlightCommonModule { }