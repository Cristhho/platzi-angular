import { Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const findByQuery = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return fixture.debugElement.query(By.css(selector))
}

export const findAllByQuery = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return fixture.debugElement.queryAll(By.css(selector))
}

export const findAllByDirective = <T, D>(fixture: ComponentFixture<T>, directive: Type<D>) => {
  return fixture.debugElement.queryAll(By.directive(directive))
}
