import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireMessaging } from '@angular/fire/compat/messaging'

import { AppComponent } from '../app.component'
import { routes } from './auth-routing.module'
import { environment } from '../../environments/environment'
import { AuthModule } from './auth.module'
import { AuthService } from '../core/services/auth.service'

fdescribe('Auth integration test', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let router: Router

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login'])
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: false
        }),
        BrowserAnimationsModule,
        AuthModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        AngularFireMessaging,
        SwUpdate,
        { provide: AuthService, useValue: spy }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
  })

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    router = TestBed.inject(Router)
    router.initialNavigation()

    tick()
    fixture.detectChanges()

  }))

  it('should create the app', () => {
    expect(component).toBeTruthy()
    expect(router.url).toEqual('/')
  })

  it('should navigate to the login page', fakeAsync(() => {
    router.navigate(['/login'])
    tick()
    fixture.detectChanges()

    expect(router.url).toEqual('/login')
  }))
})
