import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public prevTrack() {
    console.log('prev');
  }

  public playTrack() {
    console.log('play');
  }

  public pauseTrack() {
    console.log('pause');
  }

  public nextTrack() {
    console.log('next');
  }

}
