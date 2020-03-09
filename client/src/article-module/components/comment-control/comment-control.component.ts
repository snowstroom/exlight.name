import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export type TCommentControllType = 'new' | 'edit' | 'answer';
export interface ICommentSendEvent {
  content: string;
  type: TCommentControllType;
}

@Component({
  selector: 'ex-comment-control',
  templateUrl: 'comment-control.component.html',
  styleUrls: ['comment-control.component.scss'],
})
export class CommentControlComponent implements OnInit {
  public form = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Input() public autofocus = false;
  @Input() public type: TCommentControllType = 'new';
  @Input() public message = '';
  @Output()
  public send = new EventEmitter<ICommentSendEvent>();
  @Output() public cancel = new EventEmitter<TCommentControllType>();

  @Input() set wait(val: boolean) {
    if (val) {
      this.comment.disable();
    } else {
      this.comment.enable();
      this.comment.reset();
    }
  }

  @ViewChild('area') public textarea: ElementRef<HTMLTextAreaElement>;

  public ngOnInit(): void {
    if (this.autofocus) {
      this.textarea.nativeElement.focus();
    }
    if (this.message) {
      this.comment.setValue(this.message);
    }
  }

  get comment(): FormControl {
    return this.form.get('comment') as FormControl;
  }

  public sendComment(): void {
    if (this.form.valid) {
      this.send.emit({
        content: this.comment.value,
        type: this.type,
      });
    }
  }

  public cancelEdit(): void {
    this.cancel.emit(this.type);
  }
}
