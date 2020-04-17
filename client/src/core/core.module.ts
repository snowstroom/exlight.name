import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlInputComponent } from './components/exl-input/exl-input.component';
import { ButtonDecoratorComponent } from './components/button-decorator/button-decorator.component';
import { TableComponent } from './components/table/table.component';
import { LineSpinnerComponent } from './components/spinners/line-spinner/line-spinner.component';
import { SpinnerComponent } from './components/spinners/text-spinner/spinner.component';
import { RatingComponent } from './components/rating/rating.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule],
  declarations: [
    ExlInputComponent,
    ButtonDecoratorComponent,
    TableComponent,
    LineSpinnerComponent,
    SpinnerComponent,
    RatingComponent,
    PaginationComponent,
    PhotoUploaderComponent,
  ],
  exports: [
    ExlInputComponent,
    ButtonDecoratorComponent,
    TableComponent,
    LineSpinnerComponent,
    SpinnerComponent,
    RatingComponent,
    PaginationComponent,
    PhotoUploaderComponent,
  ],
})
export class ExlightCoreModule {}
