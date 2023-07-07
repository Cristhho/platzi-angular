import { AbstractControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs'

import { CategoriesService } from '../core/services/categories.service';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value

    if (!containsNumber(value)) {
      return {
        invalid_password: true
      }
    }

    return null
  }

  static matchPasswords(control: FormGroup) {
    const pass = control.get('password')?.value
    const confirm = control.get('confirmPassword')?.value

    if (pass === undefined || confirm === undefined) {
      throw new Error('Fields not found')
    }

    return (pass === confirm) ? null : {doesnt_match: true}
  }

  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value
      return service.checkCatAvailability(value).pipe(
        map((res) => {
          const isAvailable = res.isAvailable
          if (!isAvailable) {
            return {not_available: true}
          }

          return null
        })
      )
    }
  }

}

function containsNumber(value: string) {
  return value.split('').find((v) => isNumber(v)) !== undefined
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10))
}
