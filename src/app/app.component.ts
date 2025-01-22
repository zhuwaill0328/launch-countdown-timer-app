import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { pausable, PausableObservable } from 'rxjs-pausable';

interface Window {
  confetti?: (args: any) => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'launch-countdown-timer-app';
  name = 'Angular';
  paused = false;
  pausable!: PausableObservable<number>; // Use definite assignment assertion

  allowedsubmit: boolean = false;

  messageForm = new FormGroup({
    from: new FormControl(''),
    message: new FormControl('', Validators.required),
  });

  constructor(private fs: AngularFirestore) {}

  ngOnInit() {
    this.shoot();
    this.pausable = interval(800).pipe(
      pausable()
    ) as PausableObservable<number>;

    this.pausable.subscribe(() => this.shoot());
    /* this.pausable.pause(); */

    this.messageForm.controls['message'].valueChanges
      .pipe()
      .subscribe((value) => {
        if (value) this.allowedsubmit = true;
        else this.allowedsubmit = false;
      });
  }

  toggle() {
    if (this.paused) {
      this.pausable.resume();
    } else {
      this.pausable.pause();
    }
    this.paused = !this.paused;
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 50),
        origin: {
          y: 0.6,
        },
      });
    } catch (e) {
      console.warn('Confetti.js may not be loaded yet', e);
    }
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  confetti(args: any) {
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti(args); // No TypeScript error here
    }
  }

  submitmessage() {
    if (this.messageForm.valid) {
      this.fs
        .collection('Marco Angelo Montenegro')
        .add(this.messageForm.value)
        .then(() => {})
        .finally(() => {
          this.messageForm.reset();
          this.messageForm.updateValueAndValidity();
        });
    }
  }
}
