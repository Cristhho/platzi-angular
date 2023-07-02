import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive'

@Component({
  template: `
    <p appHighlight>default</p>
    <p appHighlight="yellow">other color</p>
    <p>no color</p>
    <input [appHighlight]="color" [(ngModel)]="color" />
  `
})
class HostComponent {
  color = 'green'
}

describe('HighlightDirective', () => {
  let component: HostComponent
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, HighlightDirective]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  })

  it('should have 3 element with the directive', () => {
    const directiveElements = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    const elements = fixture.debugElement.queryAll(By.css('*:not([appHighlight])'))

    expect(directiveElements.length).toEqual(3)
    expect(elements.length).toEqual(2)
  })

  it('should match the background color', () => {
    const directiveElements = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    const dir = directiveElements[0].injector.get(HighlightDirective)
    const dir2 = directiveElements[1].injector.get(HighlightDirective)

    expect(directiveElements[0].nativeElement.style.backgroundColor).toEqual(dir.default)
    expect(directiveElements[1].nativeElement.style.backgroundColor).toEqual(dir2.appHighlight)
  })

  it('should bind input and change the color', () => {
    const debug = fixture.debugElement.query(By.css('input'))
    const element: HTMLInputElement = debug.nativeElement

    expect(element.style.backgroundColor).toEqual(component.color)

    element.value = 'black'
    element.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(element.style.backgroundColor).toEqual('black')
    expect(component.color).toEqual('black')
  })
});
