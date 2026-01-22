import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockDialogData: ConfirmDialogData = {
    title: 'Confirmar acción',
    message: '¿Estás seguro?'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignora material components del template
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default confirm and cancel text if not provided', () => {
    expect(component.data.confirmText).toBe('Confirmar');
    expect(component.data.cancelText).toBe('Cancelar');
  });

  it('should close dialog with true when confirm is clicked', () => {
    component.onConfirm();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancel is clicked', () => {
    component.onCancel();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
