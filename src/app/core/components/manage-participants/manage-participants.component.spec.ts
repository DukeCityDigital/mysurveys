import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParticipantsComponent } from './manage-participants.component';

describe('ManageParticipantsComponent', () => {
  let component: ManageParticipantsComponent;
  let fixture: ComponentFixture<ManageParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
