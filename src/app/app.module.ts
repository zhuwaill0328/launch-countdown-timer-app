import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { CountdownTimerCardComponent } from './components/countdown-timer-card/countdown-timer-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownTimerComponent,
    CountdownTimerCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
