import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownCardFullComponent } from './countdown-card-full.component';

describe('CountdownCardFullComponent', () => {
  let component: CountdownCardFullComponent;
  let fixture: ComponentFixture<CountdownCardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownCardFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownCardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
