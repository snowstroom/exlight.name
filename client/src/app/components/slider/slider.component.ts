import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CarouselItem } from '@app/classes/carousel-item';

@Component({
  selector: 'ex-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() public items: CarouselItem[];
  public currentSlide: CarouselItem = new CarouselItem({
    description: 'Пусто',
    id: null,
    title: 'Пусто',
    imgUrl: ''
  });
  private timer: any;
  private currentIndex: number;
  private slides: any[] = [];

  constructor(private domSanitizer: DomSanitizer) { }

  get background(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${this.currentSlide.imgUrl})`);
  }

  public nextSlide(): void {
    if (this.currentIndex + 1 > this.slides.length - 1) {
      this.currentIndex = 0;
      this.currentSlide = this.slides[0];
    } else {
      this.currentIndex++;
      this.currentSlide = this.slides[this.currentIndex];
    }
    clearInterval(this.timer);
    this.autoNext();
  }

  public prevSlide(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.slides.length - 1;
      this.currentSlide = this.slides[this.currentIndex];
    } else {
      this.currentIndex--;
      this.currentSlide = this.slides[this.currentIndex];
    }
    clearInterval(this.timer);
    this.autoNext();
  }

  public showSlide(index: number): void {
    this.currentIndex = index;
    this.currentSlide = this.slides[index];
    clearInterval(this.timer);
    this.autoNext();
  }

  private autoNext(): void {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 12000);
  }
}
