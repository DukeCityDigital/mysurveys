import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniTableComponent } from './omni-table.component';

describe('OmniTableComponent', () => {
  let component: OmniTableComponent;
  let fixture: ComponentFixture<OmniTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
