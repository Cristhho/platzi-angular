import { ComponentFixture } from '@angular/core/testing'

import { findByQuery } from './finders'

export const setInputValue = <T>(fixture: ComponentFixture<T>, selector: string, value: string) => {
  const input = findByQuery(fixture, selector)
  const inputElement: HTMLInputElement = input.nativeElement
  inputElement.value = value
  inputElement.dispatchEvent(new Event('input'))
  inputElement.dispatchEvent(new Event('blur'))
}

export const setCheckOrRadioSelection = <T>(fixture: ComponentFixture<T>, selector: string, checked: boolean) => {
  const input = findByQuery(fixture, selector)
  const inputElement: HTMLInputElement = input.nativeElement
  inputElement.checked = checked
  inputElement.dispatchEvent(new Event('change'))
  inputElement.dispatchEvent(new Event('blur'))
}
