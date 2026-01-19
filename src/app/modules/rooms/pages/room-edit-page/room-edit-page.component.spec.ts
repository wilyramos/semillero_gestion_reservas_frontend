import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditPageComponent } from './room-edit-page.component';

describe('RoomEditPageComponent', () => {
  let component: RoomEditPageComponent;
  let fixture: ComponentFixture<RoomEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomEditPageComponent]
    });
    fixture = TestBed.createComponent(RoomEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
