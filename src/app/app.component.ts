import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-forms';

  constructor(
    private update: SwUpdate
  ){}

  ngOnInit(): void {
      this.updatePWA()
  }

  updatePWA() {
    this.update.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        window.location.reload()
      }
    })
  }
}
