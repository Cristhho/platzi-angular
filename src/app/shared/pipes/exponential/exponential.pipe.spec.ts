import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core'

import { ExponentialPipe } from './exponential.pipe'
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <span>{{5 | exponential}}</span>
  `
})
class HostComponent {}

describe('ExponentialPipe', () => {
  it('create an instance', () => {
    const pipe = new ExponentialPipe()
    expect(pipe).toBeTruthy()
  })

  it('should return 0', () => {
    const pipe = new ExponentialPipe()

    expect(pipe.transform(0)).toEqual(0)
  })

  it('should return the value taken to a square power', () => {
    const pipe = new ExponentialPipe()

    expect(pipe.transform(4)).toEqual(16)
  })

  describe('ExponentialPipe from HostComponent', () => {
    let component: HostComponent
    let fixture: ComponentFixture<HostComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [HostComponent, ExponentialPipe]
      }).compileComponents()
    })

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges()
    })

    it('should show 25', () => {
      const debug = fixture.debugElement.query(By.css('span'))

      expect(debug.nativeElement.textContent).toEqual('25')
    })
  })
})
