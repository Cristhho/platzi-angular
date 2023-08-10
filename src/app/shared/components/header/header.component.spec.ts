import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { HeaderComponent } from './header.component'
import { MaterialModule } from '../../../material/material.module'
import { RouterLinkDirectiveStub, findAllByDirective } from '../../../../testing'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        HeaderComponent,
        RouterLinkDirectiveStub
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should have 4 routerLinks', () => {
    const links = findAllByDirective(fixture, RouterLinkDirectiveStub)
    expect(links.length).toEqual(4)
  })

  it('should have 4 routerLinks and match routes', () => {
    const links = findAllByDirective(fixture, RouterLinkDirectiveStub)
    const routerLinks = links.map((_link) => _link.injector.get(RouterLinkDirectiveStub))
    expect(links.length).toEqual(4)
    expect(routerLinks[0].linkParams).toEqual('/home')
    expect(routerLinks[3].linkParams).toEqual('/order')
  })
});
