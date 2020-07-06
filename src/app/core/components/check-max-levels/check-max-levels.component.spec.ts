import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMaxLevelsComponent } from './check-max-levels.component';

describe('CheckMaxLevelsComponent', () => {
  let component: CheckMaxLevelsComponent;
  let fixture: ComponentFixture<CheckMaxLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckMaxLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMaxLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
