import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../services/token.service'

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = new TokenService()
  const router = new Router()

  const token = tokenService.getToken()
  if (!token) {
    router.navigate(['/home'])
    return false
  }

  return true;
};
