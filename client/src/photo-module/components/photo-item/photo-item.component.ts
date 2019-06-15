import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ex-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss']
})
export class PhotoItemComponent implements OnInit {
  @Input() public photo: any;

  constructor() { }

  public ngOnInit(): void {
  }

}
