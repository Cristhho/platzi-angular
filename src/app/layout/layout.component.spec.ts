import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutComponent } from './layout.component';

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent {
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LayoutComponent,
        HeaderStubComponent,
        FooterStubComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
