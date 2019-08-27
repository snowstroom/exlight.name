import { Component, Input } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

@Component({
    selector: 'ex-commentary-item',
    templateUrl: 'comment-item.component.html',
    styleUrls: ['comment-item.component.scss']
})
export class CommentaryItemComponent {
    @Input() public comment: Commentary;
}
