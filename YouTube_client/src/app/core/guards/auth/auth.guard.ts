import { inject } from '@angular/core';
import { AuthService } from '../../servises/authservice/authservice.service';

export const authGuard = () => {
  const authService = inject(AuthService);

  return authService.isAuthenticatedUser();
};
