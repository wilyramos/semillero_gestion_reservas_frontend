import { TestBed } from '@angular/core/testing';

import { ReservationsService } from './reservations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
