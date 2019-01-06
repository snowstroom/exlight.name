import { Component, OnInit, Input } from '@angular/core';
import { PhotoData } from '../../interfaces/photo-item.interface';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss']
})
export class PhotoItemComponent implements OnInit {
  @Input() photo: PhotoData;

  constructor() { }

  ngOnInit() {
  }

}
