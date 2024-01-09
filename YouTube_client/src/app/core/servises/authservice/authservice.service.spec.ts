import { AuthService } from './authservice.service';

describe('AuthserviceService', () => {
  const service: AuthService = new AuthService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get username ', () => {
    const userName = 'qwert';
    const password = 'qwert';
    const spy = jest.fn();

    service.login(userName, password);
    service.getUserName().subscribe(spy);
    expect(spy).toHaveBeenCalledWith(userName);
  });

  it('should set isAuthenticatedUser', () => {
    const userName = 'qwert';
    const password = 'qwert';

    expect(service.login(userName, password));
    expect(service.isAuthenticatedUser()).toBe(true);
  });

  it('should logout', () => {
    const userName = 'qwert';
    const password = 'qwert';

    service.login(userName, password);
    service.logout();
    expect(service.isAuthenticatedUser()).toBe(false);
  });
});
