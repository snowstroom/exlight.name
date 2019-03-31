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
    }

    public scrollPage(scroll: number): void {
        if (scroll > 100) {
            this.visible = true;
        } else {
            this.visible = false;
        }
        this.change = true;
        this.progress = scroll * 100 / (document.body.scrollHeight - innerHeight);
        setTimeout(() => this.change = false, 200);
    }

    public navigate(e: MouseEvent): void {
        const progress = e.clientX * 100 / innerWidth;
        const scrollTo = (document.body.scrollHeight - innerHeight) * progress / 100;
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }

}
