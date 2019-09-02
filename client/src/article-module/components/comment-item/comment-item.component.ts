import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

@Component({
    selector: 'ex-commentary-item',
    templateUrl: 'comment-item.component.html',
    styleUrls: ['comment-item.component.scss']
})
export class CommentaryItemComponent {
    @Input() public comment: Commentary;
    @Output() public answer = new EventEmitter();
    @Output() public delete = new EventEmitter();

    public answerToComment(): void {
        this.answer.emit();
    }
    public deleteComment(): void {
        this.delete.emit();
    }
}
