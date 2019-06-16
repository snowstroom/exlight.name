import { NgModule } from '@angular/core';
// MODULES
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlightCommonModule } from 'common-module/common.module';
// COMPONENTS
import { MusicPage } from './pages/music/music.page';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MusicItemComponent } from './components/music-item/music-item.component';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ExlightCommonModule
    ],
    declarations: [
        MusicPage,
        AudioPlayerComponent,
        MusicItemComponent
    ],
    exports: [
        MusicPage,
        AudioPlayerComponent,
        MusicItemComponent
    ]
})
export class ExlightMusicModule { }