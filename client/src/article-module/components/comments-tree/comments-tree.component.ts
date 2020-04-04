import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commentary } from '@article-module/models/commentary';
import {
  TCommentControlType,
  ICommentSendEvent,
} from '../comment-control/comment-control.component';

const PADDING = 55;
@Component({
  selector: 'ex-comment-tree',
  templateUrl: 'comments-tree.component.html',
  styleUrls: ['comments-tree.component.scss'],
})
export class CommentTreeComponent {
  public activeEdit = false;
  public root = new Commentary();
  @Input() public waitComments = false;
  @Input() public currentUserId: number;
  @Input() public total = 0;
  @Output() public new = new EventEmitter<Commentary>();
  @Output() public update = new EventEmitter<Commentary>();
  @Output() public delete = new EventEmitter<Commentary>();
  @Output() public answer = new EventEmitter<Commentary>();
  @Output() public more = new EventEmitter();
  @Output() public like = new EventEmitter<Commentary>();
  @Output() public dislike = new EventEmitter<Commentary>();

  @Input() set comments(val: Commentary[]) {
    this.root.comments = val;
  }

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

  public cancelEdit(type: TCommentControlType, comment: Commentary): void {
    if (type === 'answer') {
      this.deleteActiveEdit(comment.parentComment);
    } else {
      comment.editable = false;
    }
  }

  public answerToComment(comment: Commentary): void {
    this.deleteActiveEdit(this.root);
    const answer = new Commentary({
      articleId: comment.articleId,
      comment: '',
      comments: [],
      parentComment: comment,
      createDate: new Date(),
      updateDate: new Date(),
    });
    comment.comments.push(answer);
  }

  public deleteActiveEdit(comment: Commentary): void {
    comment.comments = comment.comments.filter(c => {
      this.deleteActiveEdit(c);
      return !!c.id;
    });
  }

  public updateEditChanges(
    { content, type }: ICommentSendEvent,
    comment: Commentary,
  ): void {
    switch (type) {
      case 'new': {
        this.root.updating = true;
        this.root.comment = content;
        this.new.emit(this.root);
        break;
      }
      case 'edit': {
        comment.updating = true;
        comment.comment = content;
        comment.edited = true;
        this.update.emit(comment);
        break;
      }
      case 'answer': {
        comment.comment = content;
        comment.updating = true;
        this.answer.emit(comment);
        break;
      }
    }
  }

  public loadMore(): void {
    this.more.emit();
  }

  public likeComment(comment: Commentary): void {
    this.like.emit(comment);
  }

  public dislikeComment(comment: Commentary): void {
    this.dislike.emit(comment);
  }
}
