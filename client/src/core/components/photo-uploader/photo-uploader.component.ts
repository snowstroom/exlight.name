import { Component, Output, EventEmitter, Input } from '@angular/core';

// tslint:disable-next-line: interface-name
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'ex-photo-uploader',
  templateUrl: 'photo-uploader.components.html',
  styleUrls: ['photo-uploader.component.scss'],
})
export class PhotoUploaderComponent {
  public isActive = false;
  @Input() public extensions: string[];
  @Input() public image: string;
  @Output() public upload = new EventEmitter<File>();
  @Output() public error = new EventEmitter<string>();

  public dropFile(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isActive = false;
    this.emitFile(e.dataTransfer.files);
  }

  public markSpaceAsActive(e: DragEvent): void {
    e.preventDefault();
    this.isActive = true;
  }

  public markSpaceAsInactive(e: DragEvent): void {
    e.preventDefault();
    this.isActive = false;
  }

  public changeFiles(e: HTMLInputEvent): void {
    this.emitFile(e.target.files);
  }

  private emitFile(list: FileList): void {
    const file = list[0];
    if (file) {
      const ext = file.name.split('.')[1];
      if (
        !this.extensions ||
        (this.extensions && this.extensions.findIndex((e) => e === ext) > -1)
      ) {
        this.upload.emit(file);
      } else {
        this.error.emit('File extension not allowed!');
      }
    } else {
      this.error.emit('File not exist!');
    }
  }
}
