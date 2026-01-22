import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) return 'status-default';
    
    // Mapeo de roles a clases CSS
    switch (status.toUpperCase()) {
      case 'ROLE_ADMIN':
        return 'status-admin';
      case 'ROLE_USER':
        return 'status-user';
      case 'ACTIVA':
        return 'status-active';
      case 'CANCELADA':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }
}