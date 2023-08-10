import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { AuthService } from './core/services/auth.service';
import { fakeActivatedRouteSnapshot, fakeRouterStateSnapshot, mockObservable } from 'src/testing';

describe('AdminGuard', () => {
  let guard: AdminGuard
  let authService: jasmine.SpyObj<AuthService>
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['hasUser'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })

    guard = TestBed.inject(AdminGuard)
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
  })

  it('should create', () => {
    expect(guard).toBeTruthy();
  })

  it('should return true', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      params: {
        idProduct: '1'
      }
    })
    const routerSnap = fakeRouterStateSnapshot({})

    const user: any = {
      displayName: 'Name',
      email: 'mail@mail.com'
    }
    authService.hasUser.and.returnValue(mockObservable(user))
    guard.canActivate(activatedRoute, routerSnap).subscribe((res) => {
      expect(res).toBeTruthy()
      doneFn()
    })
  })

  it('should return false', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      params: {
        idProduct: '1'
      }
    })
    const routerSnap = fakeRouterStateSnapshot({})

    authService.hasUser.and.returnValue(mockObservable(null))
    guard.canActivate(activatedRoute, routerSnap).subscribe((res) => {
      expect(res).toBeFalsy()
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login'])
      doneFn()
    })
  })
})
