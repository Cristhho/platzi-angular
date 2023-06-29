import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { EmailAuthCredential, ProviderId } from 'firebase/auth';

const fireAuthMethods = [
  'signInWithEmailAndPassword'
]

describe('AuthService', () => {
  let service: AuthService
  let mockFirebaseAuth: jasmine.SpyObj<AngularFireAuth>

  beforeEach(() => {
    mockFirebaseAuth = jasmine.createSpyObj('fbAuth', fireAuthMethods)
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        {provide: AngularFireAuth, useValue: mockFirebaseAuth},
        AuthService
      ]
    })
    service = TestBed.inject(AuthService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when login with email and password', () => {
    it('should return firebase credentials', async () => {
      const fakeEmail = 'mail@mail.com'
      mockFirebaseAuth.signInWithEmailAndPassword.and.callFake(() => {
        const user: any = {
          displayName: 'Name',
          email: fakeEmail
        }
        return new Promise((res) => res({
          credential: new EmailAuthCredential(),
          user
        }))
      })
      const credentials = await service.login(fakeEmail, '12345')
      expect(mockFirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
      expect(credentials.credential?.providerId).toEqual(ProviderId.PASSWORD)
      expect(credentials.user?.displayName).toEqual('Name')
      expect(credentials.user?.email).toEqual(fakeEmail)
    })
  })
});
