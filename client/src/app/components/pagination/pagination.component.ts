import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'ex-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public itemCount: number;
  @Input() public onPage: number;
  @Input() public activePage: number;
  @Output() public selectPage = new EventEmitter<number>();
  public items: number[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.buildPagination();
  }

  public ngOnChanges(): void {
    this.buildPagination();
  }

  public toPage(page: number): void {
    this.activePage = page;
    this.selectPage.emit(this.activePage);
  }

  public nextPage(): void {
    if (this.activePage < this.items.length) {
      this.activePage++;
      this.selectPage.emit(this.activePage);
    }
  }

  public prevPage(): void {
    if (this.activePage > 1) {
      this.activePage--;
      this.selectPage.emit(this.activePage);
    }
  }

  private buildPagination(): void {
    const pageCount = Math.ceil(this.itemCount / this.onPage);
    for (let i = 1; i < pageCount; i++) {
      this.items[i - 1] = i;
    }
  }

}
