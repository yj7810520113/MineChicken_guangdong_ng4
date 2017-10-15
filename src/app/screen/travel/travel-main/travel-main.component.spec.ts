import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelMainComponent } from './travel-main.component';

describe('TravelMainComponent', () => {
  let component: TravelMainComponent;
  let fixture: ComponentFixture<TravelMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
