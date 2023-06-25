import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  mySwiper: Swiper | any;

  constructor(
    @Inject(PLATFORM_ID) private platform: object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platform)) {
      this.mySwiper = new Swiper('.swiper-container');
    }
  }

}
