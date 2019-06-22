import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from '@common-module/common.module';
// COMPONENTS
import { VideoPage } from './pages/video/video.page';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ExlightCommonModule
    ],
    declarations: [
        VideoPage
    ],
    exports: [
        VideoPage
    ]
})

export class ExlightVideoModule { }
