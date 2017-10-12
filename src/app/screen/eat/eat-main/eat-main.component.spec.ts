import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatMainComponent } from './eat-main.component';

describe('EatMainComponent', () => {
  let component: EatMainComponent;
  let fixture: ComponentFixture<EatMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
