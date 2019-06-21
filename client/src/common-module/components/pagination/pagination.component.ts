import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { numberParam } from '@core/functions/number-param';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationItem } from '@app/classes/pagintaion-item';
import { LinkService } from '@core/services/link-service.service';

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
  public template: string;
  public pageCount: number;
  public prevPageItem = new PaginationItem(this.template, 1);
  public nextPageItem = new PaginationItem(this.template, 1);
  public active: number;
  private subscriber = new Subject();

  constructor(
    private actRouter: ActivatedRoute,
    private linkSrv: LinkService
  ) {
    this.actRouter.params.pipe(takeUntil(this.subscriber))
      .subscribe(params => this.active = numberParam(params.page) - 1);
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
    this.linkSrv.deleteTag(this.prevPageItem.link);
    this.linkSrv.deleteTag(this.nextPageItem.link);
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
    this.linkSrv.deleteTag(this.prevPageItem.link);
    if (this.activePage === 1) {
      this.prevPageItem = new PaginationItem(this.template, this.activePage);
    } else {
      this.prevPageItem = new PaginationItem(this.template, this.activePage - 1);
      this.prevPageItem.link = this.linkSrv.addTag({
        rel: 'prev',
        href: this.prevPageItem.url.join('/').slice(1)
      });
    }
  }

  private initNext(): void {
    this.linkSrv.deleteTag(this.nextPageItem.link);
    if (this.pageCount === this.activePage) {
      this.nextPageItem = new PaginationItem(this.template, this.pageCount);
    } else {
      this.nextPageItem = new PaginationItem(this.template, this.activePage + 1);
      this.nextPageItem.link = this.linkSrv.addTag({
        rel: 'next',
        href: this.nextPageItem.url.join('/').slice(1)
      });
    }
  }

}
