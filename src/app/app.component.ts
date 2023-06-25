import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-forms';

  constructor(
    private update: SwUpdate,
    private messaging: AngularFireMessaging
  ){}

  ngOnInit(): void {
      this.updatePWA()
      this.requestPermission()
      this.listenNotifications()
  }

  updatePWA() {
    this.update.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        window.location.reload()
      }
    })
  }

  requestPermission() {
    this.messaging.requestToken
      .subscribe((token) => {
        console.log(token)
      })
  }

  listenNotifications() {
    this.messaging.messages
      .subscribe((message) => {
        console.log(message)
      })
  }
}
