import { AbstractControl, FormGroup } from '@angular/forms';

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

    return (pass === confirm) ? null : {doesnt_match: true}
  }

}

function containsNumber(value: string) {
  return value.split('').find((v) => isNumber(v)) !== undefined
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10))
}
