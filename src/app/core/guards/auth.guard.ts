import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';


// is valid token por el tiempo de expiración TODO:
function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
}
export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('auth_token');

  // 1. No hay token
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // 2. Decodificar token
    const decoded: any = jwtDecode(token);

    // 3. Verificar expiración
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      cookieService.delete('auth_token');
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (error) {
    cookieService.delete('auth_token');
    router.navigate(['/login']);
    return false;
  }
};
