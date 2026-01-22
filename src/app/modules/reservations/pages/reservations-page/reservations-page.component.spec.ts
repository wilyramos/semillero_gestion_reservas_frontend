import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsPageComponent } from './reservations-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ReservationsPageComponent', () => {
  let component: ReservationsPageComponent;
  let fixture: ComponentFixture<ReservationsPageComponent>;

  const matDialogMock = {
    open: jasmine.createSpy('open'),
    closeAll: jasmine.createSpy('closeAll')

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsPageComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogMock }
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
