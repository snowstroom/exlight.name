import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ex-comment-control',
  templateUrl: 'comment-control.component.html',
  styleUrls: ['comment-control.component.scss'],
})
export class CommentControlComponent {
  public form = new FormGroup({
    comment: new FormControl(null, [Validators.required]),
  });

  @Output() public send = new EventEmitter();

  get comment(): FormControl {
    return this.form.get('comment') as FormControl;
  }

  public async createComment(): Promise<void> {
    if (this.form.valid) {
      this.send.emit(this.comment.value);
    }
  }
}
