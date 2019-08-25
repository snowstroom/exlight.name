import { Component, Input } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

@Component({
    selector: 'ex-article-commentary',
    templateUrl: 'article-commentary.component.html',
    styleUrls: ['article-commentary.component.scss']
})
export class ArticleCommentaryComponent {
    @Input() public commentary: Commentary;
}
