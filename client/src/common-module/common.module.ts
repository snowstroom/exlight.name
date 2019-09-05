import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// COMPONENTS
import { LineSpinnerComponent } from './components/spinners/line-spinner/line-spinner.component';
import { SpinnerComponent } from './components/spinners/text-spinner/spinner.component';
import { RatingComponent } from './components/rating/rating.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { ExlightCoreModule } from '@core/core.module';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        ExlightCoreModule
    ],
    declarations: [
        LineSpinnerComponent,
        SpinnerComponent,
        RatingComponent,
        PaginationComponent,
        CatalogMenuComponent,
        FooterComponent,
        MenuComponent
    ],
    exports: [
        LineSpinnerComponent,
        SpinnerComponent,
        RatingComponent,
        PaginationComponent,
        CatalogMenuComponent,
        FooterComponent,
        MenuComponent
    ]
})
export class ExlightCommonModule { }
