import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CarouselItem } from '@app/classes/carousel-item';
import { EnviromentService } from '@app/services/envirement.service';
import { E_SCREEN_TYPE } from '@app/enums/screen-type';

const TIME = 12000;
const DECORATOR_WIDTH = 57;
const EXS_DECORATOR_WIDTH = 38;
@Component({
  selector: 'ex-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  public leftDec = 1;
  public carouselItems: CarouselItem[];
  public currentSlide: CarouselItem;
  private timer: any;
  private currentIndex = 0;
  private screenType: E_SCREEN_TYPE;

  constructor(
    private domSanitizer: DomSanitizer,
    private envSrv: EnviromentService
  ) {
    this.envSrv.$screenType.subscribe(type => {
      this.screenType = type;
      this.calcDecorator();
    });
    this.autoNext();
  }

  get background(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${this.currentSlide.carouselImg})`);
  }

  @Input() set items(val: CarouselItem[]) {
    this.carouselItems = val;
    if (val.length) {
      this.currentSlide = val[0];
    }
  }

  public nextSlide(): void {
    if (this.currentIndex + 1 > this.carouselItems.length - 1) {
      this.currentIndex = 0;
      this.currentSlide = this.carouselItems[0];
    } else {
      this.currentIndex++;
      this.currentSlide = this.carouselItems[this.currentIndex];
    }
    this.calcDecorator();
    clearInterval(this.timer);
    this.autoNext();
  }

  public prevSlide(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.carouselItems.length - 1;
      this.currentSlide = this.carouselItems[this.currentIndex];
    } else {
      this.currentIndex--;
      this.currentSlide = this.carouselItems[this.currentIndex];
    }
    this.calcDecorator();
    clearInterval(this.timer);
    this.autoNext();
  }

  public showSlide(index: number): void {
    this.currentIndex = index;
    this.currentSlide = this.carouselItems[index];
    clearInterval(this.timer);
    this.calcDecorator();
    this.autoNext();
  }

  private autoNext(): void {
    this.timer = setInterval(() => this.nextSlide(), TIME);
  }

  private calcDecorator(): void {
    const DEC_WIDTH = this.screenType < 1 ? EXS_DECORATOR_WIDTH : DECORATOR_WIDTH;
    this.leftDec = (this.currentIndex * DEC_WIDTH) || 1;
  }
}
