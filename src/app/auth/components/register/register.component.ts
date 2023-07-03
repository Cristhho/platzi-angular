import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { MyValidators } from '../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;
  get emailField() {
    return this.form.get('email')
  }
  get passwordField() {
    return this.form.get('password')
  }
  get confirmPasswordField() {
    return this.form.get('confirmPassword')
  }
  get typeField() {
    return this.form.get('type')
  }
  get companyField() {
    return this.form.get('companyName')
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        //this.router.navigate(['/auth/login']);
      });
    } else {
      this.form.markAllAsTouched()
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', Validators.required],
      companyName: ['', Validators.required]
    }, {
      validators: MyValidators.matchPasswords
    });

    this.typeField?.valueChanges
      .subscribe((value) => {
        if (value === 'company') {
          this.companyField?.setValidators(Validators.required)
        } else {
          this.companyField?.setValidators(null)
        }

        this.companyField?.updateValueAndValidity()
      })
  }

}
