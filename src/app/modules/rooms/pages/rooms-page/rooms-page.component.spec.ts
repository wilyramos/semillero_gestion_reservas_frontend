import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsPageComponent } from './rooms-page.component';
import { MatDialog } from '@angular/material/dialog';
import { RoomsService } from '@modules/rooms/services/rooms.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Sala } from '@core/models/sala.model';

describe('RoomsPageComponent', () => {
  let component: RoomsPageComponent;
  let fixture: ComponentFixture<RoomsPageComponent>;
  let roomsServiceSpy: jasmine.SpyObj<RoomsService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockSalas: Sala[] = [
    { idSala: 1, nombre: 'Sala 1' } as Sala,
    { idSala: 2, nombre: 'Sala 2' } as Sala
  ];

  beforeEach(async () => {
    roomsServiceSpy = jasmine.createSpyObj('RoomsService', [
      'getRooms',
      'deleteRoom'
    ]);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    roomsServiceSpy.getRooms.and.returnValue(of([]));
    roomsServiceSpy.deleteRoom.and.returnValue(of({} as Sala));

    await TestBed.configureTestingModule({
      declarations: [RoomsPageComponent],
      providers: [
        { provide: RoomsService, useValue: roomsServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsPageComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rooms on init', () => {
    roomsServiceSpy.getRooms.and.returnValue(of(mockSalas));

    component.ngOnInit();

    expect(roomsServiceSpy.getRooms).toHaveBeenCalled();
    expect(component.salas.length).toBe(2);
  });

  it('should load rooms when loadRooms is called', () => {
    roomsServiceSpy.getRooms.and.returnValue(of(mockSalas));

    component.loadRooms();

    expect(component.salas).toEqual(mockSalas);
  });


  it('should NOT delete room when cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteRoom(1);

    expect(roomsServiceSpy.deleteRoom).not.toHaveBeenCalled();
  });

  it('should open dialog and reload rooms if result is true', () => {
    roomsServiceSpy.getRooms.and.returnValue(of(mockSalas));

    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.openDialog();

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(roomsServiceSpy.getRooms).toHaveBeenCalled();
  });

  it('should open edit dialog with sala data', () => {
    const sala: Sala = { idSala: 1, nombre: 'Sala 1' } as Sala;

    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.openEditDialog(sala);

    expect(matDialogSpy.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({ data: sala })
    );
  });
});
