import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { SliderApiData } from '../../interfaces/SliderApiData.interface';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  private timer: any;
  private currentSlide: SliderApiData;
  private currentIndex: number;
  private slides: SliderApiData[] = [];

  constructor(
    private appStateSrv: AppStateService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.appStateSrv.slider$.subscribe(slides => {
      if (slides.length) {
        this.slides = slides;
        this.currentIndex = 0;
        this.currentSlide = slides[0];
        this.autoNext();
      }
    });
  }
  get background(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${this.currentSlide.urlImg})`);
  }
  public nextSlide() {
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

  public prevSlide() {
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

  public showSlide(index: number) {
    this.currentIndex = index;
    this.currentSlide = this.slides[index];
    clearInterval(this.timer);
    this.autoNext();
  }

  private autoNext() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 12000);
  }
}
