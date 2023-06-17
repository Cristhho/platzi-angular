import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  ngOnExit: () => Observable<boolean> | Promise<boolean> | boolean
}

export const exitGuard: CanDeactivateFn<OnExit> = (component, currentRoute, currentState, nextState) => {
  return component.ngOnExit ? component.ngOnExit() : true;
};
