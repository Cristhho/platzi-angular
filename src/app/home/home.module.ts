import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';

import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../shared/shared.module';
import { SearchComponent } from './components/search/search.component';

register()

@NgModule({
  declarations: [
    BannerComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {

}
