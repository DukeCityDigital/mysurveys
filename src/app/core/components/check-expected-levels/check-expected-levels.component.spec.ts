import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckExpectedLevelsComponent } from './check-expected-levels.component';

describe('CheckExpectedLevelsComponent', () => {
  let component: CheckExpectedLevelsComponent;
  let fixture: ComponentFixture<CheckExpectedLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckExpectedLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckExpectedLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
