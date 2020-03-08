import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

const PADDING = 55;
@Component({
  selector: 'ex-comment-tree',
  templateUrl: 'comments-tree.component.html',
  styleUrls: ['comments-tree.component.scss'],
})
export class CommentTreeComponent {
  @Input() public comments: Commentary[] = [];
  @Output() public delete = new EventEmitter<Commentary>();
  @Output() public new = new EventEmitter<Commentary>();

  public getPadding(lvl: number): number {
    return PADDING * lvl;
  }

  public deleteComment(comment: Commentary): void {
    this.delete.emit(comment);
  }

  public answerToComment(comment: Commentary): void {
    comment.comments.push(
      new Commentary({
        articleId: comment.articleId,
        comment: '',
        comments: [],
        parentComment: comment,
      }),
    );
  }

  public sendNewComment(content: string, comment?: Commentary): void {
    comment.comment = content;
    this.new.emit(comment);
  }
}
