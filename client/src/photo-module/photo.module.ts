import { NgModule } from '@angular/core';
import { PhotoPage } from './pages/photo/photo.page';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { ExlightCommonModule } from 'common-module/common.module';

@NgModule({
    imports: [
        ExlightCommonModule
    ],
    declarations: [
        PhotoPage,
        PhotoItemComponent
    ],
    exports: [
        PhotoPage
    ]
})
export class ExlightPhotoModule { }
