import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatPlaceTypeCompareComponent } from './eat-place-type-compare.component';

describe('EatPlaceTypeCompareComponent', () => {
  let component: EatPlaceTypeCompareComponent;
  let fixture: ComponentFixture<EatPlaceTypeCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatPlaceTypeCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatPlaceTypeCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
