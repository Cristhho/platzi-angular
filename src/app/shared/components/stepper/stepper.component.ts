import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements ControlValueAccessor {

  value = 5
  private _onChange!: (value: number) => void
  private _onTouched!: () => void
  isDisabled = false

  add() {
    this.value += 1
    this._onTouched()
    this._onChange(this.value)
  }

  sub() {
    this.value -= 1
  }

  writeValue(value: number): void {
    if (value) {
      this.value = value
    }
  }
  registerOnChange(fn: any): void {
    this._onChange = fn
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

}
