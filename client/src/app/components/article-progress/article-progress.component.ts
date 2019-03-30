import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'ex-article-progress',
    templateUrl: 'article-progress.component.html',
    styleUrls: ['article-progress.component.scss']
})
export class ArticleProgressComponent {
    public progress = 0;
    public visible = false;
    public change = false;
    @HostListener('window:scroll', ['$event'])
    public scrollPage(): void {
        if (scrollY > 100) {
            this.visible = true;
        } else {
            this.visible = false;
        }
        this.change = true;
        setTimeout(() => this.change = false, 200);
        console.warn(scrollY);
        this.progress = (scrollY + innerHeight) * 100 / document.body.scrollHeight;
    }

}
