import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailAuthCredential } from 'firebase/auth';
import { Router } from '@angular/router';

import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../../material/material.module';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { findByQuery, getElementText, mockPromise, setCheckOrRadioSelection, setInputValue } from '../../../../testing';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let authService: jasmine.SpyObj<AuthService>
  let router: jasmine.SpyObj<Router>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['createUser'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: spy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
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

    it('should send the form successfully', fakeAsync(() => {
      component.form.patchValue({
        email: 'email@mail.com',
        password: '1234ad',
        confirmPassword: '1234ad',
        type: 'customer'
      })
      const user: any = {
        displayName: 'Name',
        email: 'email@mail.com'
      }
      authService.createUser.and.returnValue(mockPromise({
        credential: new EmailAuthCredential(),
        user
      }))

      component.register(new Event('submit'))
      tick()
      fixture.detectChanges()

      expect(component.form.valid).toBeTruthy()
      expect(authService.createUser).toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login'])

    }))

    it('should fill all inputs and click the submit button', fakeAsync(() => {
      setInputValue(fixture, 'input#email', 'email@mail.com')
      setInputValue(fixture, 'input#password', '123456')
      setInputValue(fixture, 'input#confirmPassword', '123456')
      setCheckOrRadioSelection(fixture, 'mat-radio-button#typeCustomer', true)
      const button = findByQuery(fixture, 'button')
      const user: any = {
        displayName: 'Name',
        email: 'email@mail.com'
      }
      authService.createUser.and.returnValue(mockPromise({
        credential: new EmailAuthCredential(),
        user
      }))

      button.nativeElement.click(new Event('click'))
      tick()
      fixture.detectChanges()

      expect(component.form.valid).toBeTruthy()
      expect(authService.createUser).toHaveBeenCalled()

    }))

    it('should has an error from the service', fakeAsync(() => {
      setInputValue(fixture, 'input#email', 'email@mail.com')
      setInputValue(fixture, 'input#password', '123456')
      setInputValue(fixture, 'input#confirmPassword', '123456')
      setCheckOrRadioSelection(fixture, 'mat-radio-button#typeCustomer', true)
      const button = findByQuery(fixture, 'button')
      authService.createUser.and.returnValue(Promise.reject('Error'))

      button.nativeElement.click(new Event('click'))
      tick()
      fixture.detectChanges()

      expect(component.form.valid).toBeTruthy()
      expect(authService.createUser).toHaveBeenCalled()
      expect(component.error).toEqual('Error')
    }))
  })
})
