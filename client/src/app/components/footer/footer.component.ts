import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public year = new Date().getFullYear();
  constructor() { }

  public ngOnInit(): void {
  }

}
