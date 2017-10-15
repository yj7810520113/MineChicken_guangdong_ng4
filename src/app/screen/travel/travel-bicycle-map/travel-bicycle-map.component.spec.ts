import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBicycleMapComponent } from './travel-bicycle-map.component';

describe('TravelBicycleMapComponent', () => {
  let component: TravelBicycleMapComponent;
  let fixture: ComponentFixture<TravelBicycleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelBicycleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelBicycleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
