import { Component } from '@angular/core';


//https://www.w3schools.com/howto/img_avatar.png
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgInput = '';

  onLoaded(event: string) {
    console.log('From parent', event)
  }
}
