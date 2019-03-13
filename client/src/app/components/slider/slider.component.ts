import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CarouselItem } from '@app/classes/carousel-item';

const TIME = 12000;
@Component({
  selector: 'ex-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  public carouselItems: CarouselItem[];
  public currentSlide: CarouselItem;
  private timer: any;
  private currentIndex = 0;

  constructor(private domSanitizer: DomSanitizer) {
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
    clearInterval(this.timer);
    this.autoNext();
  }

  public showSlide(index: number): void {
    this.currentIndex = index;
    this.currentSlide = this.carouselItems[index];
    clearInterval(this.timer);
    this.autoNext();
  }

  private autoNext(): void {
    this.timer = setInterval(() => this.nextSlide(), TIME);
  }
}
