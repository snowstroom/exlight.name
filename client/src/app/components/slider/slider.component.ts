import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CarouselItem } from '@app/classes/carousel-item';

@Component({
  selector: 'ex-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  private timer: any;
  private currentSlide: CarouselItem = new CarouselItem({
    data: 'Пусто',
    id: null,
    title: 'Пусто',
    urlImg: ''
  });
  private currentIndex: number;
  private slides: any[] = [];

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {
    /*
    this.appStateSrv.slider$.subscribe(slides => {
      if (slides.length) {
        this.slides = slides;
        this.currentIndex = 0;
        this.currentSlide = slides[0];
        this.autoNext();
      }
    });*/
  }
  get background(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${this.currentSlide.urlImg})`);
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
