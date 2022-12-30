import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnChanges{
  @Input() src!: string;
  svg: any;

  constructor(private http: HttpClient, private sanitazer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.src) {
      this.svg = ''
      return;
    }
    this.http
      .get(this.src, { responseType: 'text' })
      .subscribe(value => {
        this.svg = this.sanitazer.bypassSecurityTrustHtml(value)
      })
  }
  

}
