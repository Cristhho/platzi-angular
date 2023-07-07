import { FormControl, FormGroup } from '@angular/forms'

import { MyValidators } from './validators'

describe('MyValidators', () => {
  describe('test for validPassword', () => {
    it('should return null if the password contains at least one number', () => {
      const control = new FormControl()
      control.setValue('das123')

      const result = MyValidators.validPassword(control)

      expect(result).toBeNull()
    })

    it('should return an error object', () => {
      const control = new FormControl()
      control.setValue('abcde')

      const result = MyValidators.validPassword(control)

      expect(result?.invalid_password).toBeTruthy()
    })
  })

  describe('test for matchPasswords', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('asd123'),
        confirmPassword: new FormControl('asd123')
      })

      const result = MyValidators.matchPasswords(group)

      expect(result).toBeNull()
    })

    it('should return an error object', () => {
      const group = new FormGroup({
        password: new FormControl('asd123'),
        confirmPassword: new FormControl('asd123a')
      })

      const result = MyValidators.matchPasswords(group)

      expect(result?.doesnt_match).toBeTruthy()
    })

    it('should throw an error', () => {
      const group = new FormGroup({
        field: new FormControl('asd123'),
        field2: new FormControl('asd123')
      })

      const fn = () => {MyValidators.matchPasswords(group)}

      expect(fn).toThrowError('Fields not found')
    })
  })
})
