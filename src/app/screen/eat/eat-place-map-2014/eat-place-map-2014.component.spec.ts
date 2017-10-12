import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatPlaceMap2014Component } from './eat-place-map-2014.component';

describe('EatPlaceMap2014Component', () => {
  let component: EatPlaceMap2014Component;
  let fixture: ComponentFixture<EatPlaceMap2014Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatPlaceMap2014Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatPlaceMap2014Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
