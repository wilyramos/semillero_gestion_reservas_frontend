import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomEditPageComponent } from './room-edit-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RoomEditPageComponent', () => {
  let component: RoomEditPageComponent;
  let fixture: ComponentFixture<RoomEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomEditPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
