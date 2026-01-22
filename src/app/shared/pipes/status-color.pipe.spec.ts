import { StatusColorPipe } from './status-color.pipe';

describe('StatusColorPipe', () => {
  let pipe: StatusColorPipe;

  beforeEach(() => {
    pipe = new StatusColorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return status-default when status is null', () => {
    expect(pipe.transform(null as any)).toBe('status-default');
  });

  it('should return status-default when status is empty', () => {
    expect(pipe.transform('')).toBe('status-default');
  });

  it('should return status-admin for ROLE_ADMIN', () => {
    expect(pipe.transform('ROLE_ADMIN')).toBe('status-admin');
  });

  it('should return status-user for ROLE_USER', () => {
    expect(pipe.transform('ROLE_USER')).toBe('status-user');
  });

  it('should return status-active for ACTIVA', () => {
    expect(pipe.transform('ACTIVA')).toBe('status-active');
  });

  it('should return status-cancelled for CANCELADA', () => {
    expect(pipe.transform('CANCELADA')).toBe('status-cancelled');
  });

  it('should be case insensitive', () => {
    expect(pipe.transform('role_admin')).toBe('status-admin');
    expect(pipe.transform('activa')).toBe('status-active');
  });

  it('should return status-default for unknown status', () => {
    expect(pipe.transform('UNKNOWN_STATUS')).toBe('status-default');
  });
});
