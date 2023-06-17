import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service'

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.user$
    .pipe(
      map((user) => {
        if (user?.role === 'admin') {
          return true
        }

        router.navigate(['/home'])
        return false
      })
    )
};
