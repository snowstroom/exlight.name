import { Component, HostListener } from '@angular/core';
import { ApplicationService } from '@app/services/app.service';

@Component({
    selector: 'ex-article-progress',
    templateUrl: 'article-progress.component.html',
    styleUrls: ['article-progress.component.scss']
})
export class ArticleProgressComponent {
    public progress = 0;
    public visible = false;
    public change = false;
    constructor(private appSrv: ApplicationService) {
        this.appSrv.$scroll.subscribe(scroll => this.scrollPage(scroll));
        this.appSrv.$scrollProgressState.subscribe(state => this.visible = state);
    }

    public scrollPage(scroll: number): void {
        this.change = true;
        this.progress = ApplicationService.scrollPageToPrecent(scroll);
        setTimeout(() => this.change = false, 200);
    }

    public navigate(e: MouseEvent): void {
        const progress = e.clientX * 100 / innerWidth;
        const scrollTo =  ApplicationService.scrollPrecentToPX(progress);
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }

}
