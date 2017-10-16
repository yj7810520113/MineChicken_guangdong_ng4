import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAqiComponent } from './travel-aqi.component';

describe('TravelAqiComponent', () => {
  let component: TravelAqiComponent;
  let fixture: ComponentFixture<TravelAqiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAqiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAqiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
