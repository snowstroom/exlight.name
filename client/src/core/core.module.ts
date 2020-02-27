import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ExlInputComponent } from './components/exl-input/exl-input.component';
import { ButtonDecoratorComponent } from './components/button-decorator/button-decorator.component';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [ExlInputComponent, ButtonDecoratorComponent],
  exports: [ExlInputComponent, ButtonDecoratorComponent],
})
export class ExlightCoreModule {}
