import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPageComponent } from './calendar-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent;
  let fixture: ComponentFixture<CalendarPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarPageComponent],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
