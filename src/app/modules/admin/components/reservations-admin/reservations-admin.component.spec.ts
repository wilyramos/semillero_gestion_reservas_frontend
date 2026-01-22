import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsAdminComponent } from './reservations-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';


describe('ReservationsAdminComponent', () => {
  let component: ReservationsAdminComponent;
  let fixture: ComponentFixture<ReservationsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsAdminComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ReservationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
