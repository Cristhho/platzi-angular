import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, RouterLinkWithHref } from '@angular/router'

import { LayoutComponent } from './layout/layout.component'
import { HeaderComponent } from './shared/components/header/header.component'
import { MaterialModule } from './material/material.module'
import { findAllByDirective, findByQuery } from '../testing'

@Component({
  selector: 'app-home'
})
class HomeComponent {}

@Component({
  selector: 'app-products'
})
class ProductsComponent {}

@Component({
  selector: 'app-contact'
})
class ContactComponent {}

const routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
]

fdescribe('App integration test', () => {
  let fixture: ComponentFixture<LayoutComponent>
  let component: LayoutComponent
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MaterialModule
      ],
      declarations: [
        LayoutComponent,
        HeaderComponent,
        HomeComponent,
        ProductsComponent,
        ContactComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()
  })

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    router = TestBed.inject(Router)
    router.initialNavigation()

    tick()
    fixture.detectChanges()
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })

  it('should have 4 routerLinks', () => {
    const links = findAllByDirective(fixture, RouterLinkWithHref)
    expect(links.length).toEqual(4)
  })

  it('should render HomeComponent when navigate to /home', fakeAsync(() => {
    const debug = findByQuery(fixture, 'a')
    const element: HTMLElement = debug.nativeElement
    element.click()

    tick()
    fixture.detectChanges()

    expect(router.url).toEqual('/home')
    const element2 = findByQuery(fixture, 'app-home')
    expect(element2).not.toBeNull()
  }))
})
