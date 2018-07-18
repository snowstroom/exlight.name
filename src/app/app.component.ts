import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('htmlPlayer') htmlPlayer: ElementRef<HTMLAudioElement>;
  constructor() { }

  ngOnInit() {
    console.log(this.htmlPlayer);
    // this.htmlPlayer.nativeElement.play();
  }
}
