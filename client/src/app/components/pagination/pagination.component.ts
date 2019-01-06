import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemCount: number;
  @Input() onPage: number;
  @Input() activePage: number;
  @Output() selectPage = new EventEmitter<number>();
  public items: number[] = [];

  constructor() { }

  ngOnInit() {
    this.buildPagination();
  }

  ngOnChanges() {
    this.buildPagination();
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

  private buildPagination() {
    const pageCount = Math.ceil(this.itemCount / this.onPage);
    for (let i = 1; i < pageCount; i++) {
      this.items[i - 1] = i;
    }
  }

}
