import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatPlaceMapComponent } from './eat-place-map.component';

describe('EatPlaceMapComponent', () => {
  let component: EatPlaceMapComponent;
  let fixture: ComponentFixture<EatPlaceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatPlaceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatPlaceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
