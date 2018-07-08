import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemCount: number;
  @Input() onPage: number;
  @Output() selectPage = new EventEmitter<number>();
  public activePage = 1;
  public items: number[] = [1, 2, 3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
  }

  public toPage(page: number) {
    this.activePage = page;
    this.selectPage.emit(this.activePage);
  }

  public nextPage() {
    if (this.activePage < this.items.length) {
      this.activePage++;
      this.selectPage.emit(this.activePage);
    }
  }

  public prevPage() {
    if (this.activePage > 1) {
      this.activePage--;
      this.selectPage.emit(this.activePage);
    }
  }

}
