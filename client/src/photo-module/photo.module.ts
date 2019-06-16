import { NgModule } from '@angular/core';
// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExlightCommonModule } from 'common-module/common.module';
// COMPONENTS
import { PhotoPage } from './pages/photo/photo.page';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';

@NgModule({
    imports: [
        ExlightCommonModule,
        CommonModule,
        BrowserModule,
    ],
    declarations: [
        PhotoPage,
        PhotoItemComponent
    ],
    exports: [
        PhotoPage,
    ]
})
export class ExlightPhotoModule { }
