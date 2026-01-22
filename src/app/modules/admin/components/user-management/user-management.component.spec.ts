import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: MatSnackBar,
          useValue: {}
        }
      ],
      schemas: []
    });
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
