import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

@Component({
  selector: 'ex-commentary-item',
  templateUrl: 'comment-item.component.html',
  styleUrls: ['comment-item.component.scss'],
})
export class CommentaryItemComponent {
  @Input() public wait = false;
  @Input() public comment: Commentary;
  @Input() public currentUserId: number;
  @Output() public answer = new EventEmitter();
  @Output() public delete = new EventEmitter();
  @Output() public edit = new EventEmitter();
  @Output() public like = new EventEmitter();

  public answerToComment(): void {
    this.answer.emit();
  }

  public deleteComment(): void {
    this.delete.emit();
  }

  public editComment(): void {
    this.edit.emit();
  }

  public likeComment(): void {
    this.like.emit();
  }
}
