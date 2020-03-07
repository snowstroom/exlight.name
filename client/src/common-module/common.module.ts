import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// COMPONENTS
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { ExlightCoreModule } from '@core/core.module';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule, ExlightCoreModule],
  declarations: [
    CatalogMenuComponent,
    FooterComponent,
    MenuComponent,
  ],
  exports: [
    CatalogMenuComponent,
    FooterComponent,
    MenuComponent,
  ],
})
export class ExlightCommonModule {}
