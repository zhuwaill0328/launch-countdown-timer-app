import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { CountdownTimerCardComponent } from './components/countdown-timer-card/countdown-timer-card.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { CountdownCardFullComponent } from './components/countdown-card-full/countdown-card-full.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const FIREBASE_REF = {
  DEFAULT_INSTANCE_DB_AUTH: '[DEFAULT]',
  TEMP_INSTANCE_DB_AUTH: 'TEMP-DB',
};
@NgModule({
  declarations: [
    AppComponent,
    CountdownTimerComponent,
    CountdownTimerCardComponent,
    SvgIconComponent,
    CountdownCardFullComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
