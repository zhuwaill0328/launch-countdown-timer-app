import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  title = 'launch-countdown-timer-app';
  name = 'Angular';
  paused = false;
  pausable!: PausableObservable<number>; // Use definite assignment assertion
  targetdate: Date = new Date(2025, 0, 31, 0, 0, 0);

  allowedsubmit: boolean = false;

  messageForm = new FormGroup({
    from: new FormControl(''),
    message: new FormControl('', Validators.required),
  });

  constructor(private fs: AngularFirestore) {}

  showModal: boolean = false;

  toggleModal(): void {
    this.showModal = !this.showModal;
    this.toggle();
  }

  showmodalbutton: boolean = false;

  allcomments: any = [];
  p: number = 1;
  pagesize: any = 5;
  loadComments() {
    this.fs
      .collection('Marco Angelo Montenegro')
      .snapshotChanges()
      .pipe()
      .subscribe((data: any) => {
        data.forEach((info: any) => {
          let item: any = info.payload.doc.data();
          item.id = info.payload.doc.id;
          const found = this.allcomments.find((f: any) => f.id === item.id);
          if (!found) {
            this.allcomments.push(item);
          }
        });
      });
  }

  ngOnInit() {
    this.shoot();
    this.pausable = interval(3000).pipe(
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

    this.loadComments();
    setTimeout(() => {
      let currentDate = new Date();
      const delta = (this.targetdate.getTime() - currentDate.getTime()) / 1000;

      if (delta <= 0) {
        this.showmodalbutton = true;
      } else {
        this.showmodalbutton = false;
      }
    }, 1000);
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

  height: number = 40; // Initial height of the textarea.

  @ViewChild('textarea', { static: false }) textarea!: ElementRef;

  adjustHeight(): void {
    if (this.textarea) {
      const textarea = this.textarea.nativeElement;
      textarea.style.height = 'auto'; // Reset to auto to calculate scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  }

  onInput(): void {
    this.adjustHeight(); // Adjust height on input
  }

  ngAfterViewInit(): void {
    // Initialize the height once the view is rendered
    this.adjustHeight();
  }
}
