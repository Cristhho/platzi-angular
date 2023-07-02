import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../../material/material.module';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { getElementText, setInputValue } from '../../../../testing';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['createUser'])
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when fill the email input', () => {
    it('should be validated', () => {
      component.emailField?.setValue('not an email')
      expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy()

      component.emailField?.setValue('')
      expect(component.emailField?.invalid).withContext('empty email').toBeTruthy()
    })

    it('should change the value and validate', () => {
      setInputValue(fixture, 'input#email', 'not an email')
      fixture.detectChanges()

      expect(component.emailField?.invalid).toBeTruthy()
      expect(component.emailField?.hasError('email')).toBeTruthy()

      const errorText = getElementText(fixture, '[data-testid="not-valid-email"]')
      expect(errorText).toContain('El email no es válido')
    })
  })

  describe('when fill the password input', () => {
    it('should be validated', () => {
      component.passwordField?.setValue('')
      expect(component.passwordField?.invalid).withContext('empty password').toBeTruthy()

      component.passwordField?.setValue('12345')
      expect(component.passwordField?.invalid).withContext('not long enough').toBeTruthy()

      component.passwordField?.setValue('abcdefg')
      expect(component.passwordField?.invalid).withContext('not contain a number').toBeTruthy()
    })
  })

  describe('when fill all the form', () => {
    it('should be validated', () => {
      component.form.patchValue({
        email: 'email@mail.com',
        password: '1234ad',
        confirmPassword: '123456',
        type: 'company',
        companyName: 'name'
      })

      expect(component.form.invalid).toBeTruthy()
    })
  })
})
