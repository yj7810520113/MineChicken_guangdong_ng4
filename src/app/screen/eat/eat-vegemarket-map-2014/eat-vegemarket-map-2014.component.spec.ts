import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatVegemarketMap2014Component } from './eat-vegemarket-map-2014.component';

describe('EatVegemarketMap2014Component', () => {
  let component: EatVegemarketMap2014Component;
  let fixture: ComponentFixture<EatVegemarketMap2014Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatVegemarketMap2014Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatVegemarketMap2014Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
