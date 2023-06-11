import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  @Input() img: string = 'https://www.w3schools.com/howto/img_avatar.png'
  @Output() loaded = new EventEmitter<string>()
  imgDefault = './assets/images/default.png'

  imgError() {
    this.img = this.imgDefault
  }

  imgLoaded() {
    this.loaded.emit(this.img)
  }
}
