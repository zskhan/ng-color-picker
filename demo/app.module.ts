import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorPickerModule, ColorPickerService } from '../lib'


@NgModule({
  imports: [
    BrowserModule,
    ColorPickerModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ColorPickerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}