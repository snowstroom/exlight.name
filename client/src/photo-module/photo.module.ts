import { NgModule } from '@angular/core';
import { PhotoPage } from './pages/photo/photo.page';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';

@NgModule({
    declarations: [
        PhotoPage,
        PhotoItemComponent
    ],
    exports: [
        PhotoPage
    ]
})
export class ExlightPhotoModule { }
