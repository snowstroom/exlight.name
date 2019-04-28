import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { numberParam } from '@core/functions/number-param';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationItem } from '@app/classes/pagintaion-item';

const ELEMENT_WIDTH = 52;

@Component({
  selector: 'ex-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public onPage: number;
  @Input() public activePage: number;
  public itemsCount: number;
  public items: PaginationItem[] = [];
  public leftDec: number;
  public template: string;
  public pageCount: number;
  public prevPageItem = new PaginationItem(this.template, 1);
  public nextPageItem = new PaginationItem(this.template, 1);
  private subscriber = new Subject();

  constructor(private actRouter: ActivatedRoute) {
    this.actRouter.params.pipe(takeUntil(this.subscriber))
      .subscribe(params => {
        const page = numberParam(params.page);
        this.leftDec = page * ELEMENT_WIDTH - ELEMENT_WIDTH;
      });
    this.actRouter.url.pipe(takeUntil(this.subscriber))
      .subscribe(url => {
        this.template = url.map(s => s.path)
          .join('/')
          .replace(new RegExp(/page\/\d/), 'page/%');
        this.buildPagination();
      });
  }

  @Input() set recordCount(val: number) {
    this.itemsCount = val;
    this.buildPagination();
  }

  public ngOnInit(): void {
    this.buildPagination();
  }

  public ngOnChanges(): void {
    this.buildPagination();
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
  }

  public toPage(page: number): void {
    this.activePage = page;
    this.initPrev();
    this.initNext();
  }

  public nextPage(): void {
    if (this.activePage < this.items.length) {
      this.activePage++;
      this.initPrev();
      this.initNext();
    }
  }

  public prevPage(): void {
    if (this.activePage > 1) {
      this.activePage--;
      this.initPrev();
      this.initNext();
    }
  }

  private buildPagination(): void {
    if (this.itemsCount && this.onPage && this.template) {
      this.pageCount = Math.ceil(this.itemsCount / this.onPage);
      this.initPrev();
      this.initNext();
      this.items = [new PaginationItem(this.template, 1)];
      for (let i = 1; i <= this.pageCount; i++) {
        this.items[i - 1] = new PaginationItem(this.template, i);
      }
    }
  }

  private initPrev(): void {
    this.activePage === 1 ?
      this.prevPageItem = new PaginationItem(this.template, this.activePage) :
      this.prevPageItem = new PaginationItem(this.template, this.activePage - 1);
  }

  private initNext(): void {
    this.pageCount === this.activePage ?
      this.nextPageItem = new PaginationItem(this.template, this.pageCount) :
      this.nextPageItem = new PaginationItem(this.template, this.activePage + 1);
  }

}
