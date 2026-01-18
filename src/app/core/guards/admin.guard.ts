import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('auth_token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);

    const roles: string[] = decoded.roles || [];

    if (!roles.includes('ADMIN')) {
      router.navigate(['/reservas']); // acceso denegado
      return false;
    }

    return true;

  } catch (error) {
    
    cookieService.delete('auth_token');
    router.navigate(['/login']);
    return false;
  }
};
