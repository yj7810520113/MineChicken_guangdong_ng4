import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatBabyMilkComponent } from './eat-baby-milk.component';

describe('EatBabyMilkComponent', () => {
  let component: EatBabyMilkComponent;
  let fixture: ComponentFixture<EatBabyMilkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatBabyMilkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatBabyMilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
