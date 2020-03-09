import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';

const PADDING = 55;
@Component({
  selector: 'ex-comment-tree',
  templateUrl: 'comments-tree.component.html',
  styleUrls: ['comments-tree.component.scss'],
})
export class CommentTreeComponent {
  public rootComment = new Commentary();
  @Input() public waitComments = false;
  @Input() public comments: Commentary[] = [];
  @Output() public delete = new EventEmitter<Commentary>();
  @Output() public new = new EventEmitter<Commentary>();
  @Output() public update = new EventEmitter<Commentary>();

  public getPadding(lvl: number): number {
    return PADDING * lvl;
  }

  public deleteComment(comment: Commentary): void {
    comment.updating = true;
    this.delete.emit(comment);
  }

  public editComment(comment: Commentary): void {
    comment.editable = true;
  }

  public cancelEdit(comment: Commentary): void {
    comment.editable = false;
  }

  public answerToComment(comment: Commentary): void {
    const asnwer = new Commentary({
      articleId: comment.articleId,
      comment: '',
      comments: [],
      parentComment: comment,
      createDate: new Date(),
      updateDate: new Date()
    });
    asnwer.editable = true;
    comment.comments.push(asnwer);
  }

  public sendNewComment(content: string, comment?: Commentary): void {
    if (comment) {
      if (!comment.editable) {
        comment.comment = content;
        comment.updating = true;
        this.new.emit(comment);
      } else {
        comment.updating = true;
        comment.comment = content;
        this.update.emit(comment);
      }
    } else {
      this.rootComment.updating = true;
      this.rootComment.comment = content;
      this.new.emit(this.rootComment);
    }
  }
}
