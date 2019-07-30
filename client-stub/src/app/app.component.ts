import { Component } from '@angular/core';
import { SOCIAL } from './consts/social';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly social = SOCIAL;
}
