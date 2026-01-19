import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddPageComponent } from './room-add-page.component';

describe('RoomAddPageComponent', () => {
  let component: RoomAddPageComponent;
  let fixture: ComponentFixture<RoomAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomAddPageComponent]
    });
    fixture = TestBed.createComponent(RoomAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
