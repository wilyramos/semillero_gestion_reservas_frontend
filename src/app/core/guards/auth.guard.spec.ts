import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './auth.guard';
import { jwtDecode } from 'jwt-decode';

describe('authGuard', () => {
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should redirect to login if no token', () => {
    cookieServiceSpy.get.and.returnValue('');

    const result = executeGuard();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
 
});
