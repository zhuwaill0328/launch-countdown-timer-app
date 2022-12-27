import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-timer-card',
  templateUrl: './countdown-timer-card.component.html',
  styleUrls: ['./countdown-timer-card.component.scss']
})
export class CountdownTimerCardComponent {
  @Input() value!: number;
  @Input() label!: string;
}
