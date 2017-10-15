import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatVegemarketMapComponent } from './eat-vegemarket-map.component';

describe('EatVegemarketMapComponent', () => {
  let component: EatVegemarketMapComponent;
  let fixture: ComponentFixture<EatVegemarketMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatVegemarketMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatVegemarketMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
