import { Component } from '@angular/core'

import { FilesService } from './services/files.service';


//https://www.w3schools.com/howto/img_avatar.png
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgInput = '';

  constructor(
    private fileService: FilesService
  ) {}

  onLoaded(event: string) {
    console.log('From parent', event)
  }

  /*createUser() {
    this.userService.create({
      name: 'christian',
      email: 'christian@google.com',
      password: '123456'
    }).subscribe((data) => {
      console.log(data)
    })
  }*/

  downloadPdf() {
    this.fileService.getFile('pdf.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }
}
