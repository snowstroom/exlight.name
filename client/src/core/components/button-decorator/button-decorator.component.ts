import {
  Component,
  Input,
  AfterContentInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'ex-button-decorator',
  templateUrl: 'button-decorator.component.html',
  styleUrls: ['button-decorator.component.scss'],
})
export class ButtonDecoratorComponent implements AfterContentInit {
  public width: number;
  public position = 0.0001;
  @Input() public fixedWidth: number;
  @ViewChild('content') private buttons: ElementRef<HTMLDivElement>;
  private children: HTMLCollection;
  private active: number;

  public ngAfterContentInit(): void {
    this.children = this.buttons.nativeElement.children;
    this.updateDecorator();
  }

  @Input() set activeIndex(val: number) {
    this.active = val;
    this.updateDecorator();
  }

  private updateDecorator(): void {
    if (this.children) {
      this.position = 0.0001;
      for (let i = 0; i <= this.active; i++) {
        const element = this.children.item(i);
        if (i !== this.active) {
          this.position += element.clientWidth;
        } else {
          this.width = element.clientWidth;
        }
      }
    }
  }
}
