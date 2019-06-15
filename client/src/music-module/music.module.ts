import { NgModule } from '@angular/core';
import { MusicPage } from './pages/music/music.page';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MusicItemComponent } from './components/music-item/music-item.component';

@NgModule({
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