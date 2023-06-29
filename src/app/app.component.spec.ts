import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SwUpdate } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

fdescribe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: false
      }),
    ],
    providers: [
      AngularFireMessaging,
      SwUpdate
    ],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
