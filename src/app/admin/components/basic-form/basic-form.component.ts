import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent {

  form!: FormGroup
  get nameField() {
    return this.form.get('fullName')?.get('name')
  }
  get lastNameField() {
    return this.form.get('fullName')?.get('lastName')
  }
  get emailField() {
    return this.form.get('email')
  }
  get phoneField() {
    return this.form.get('phone')
  }
  get colorField() {
    return this.form.get('color')
  }
  get dateField() {
    return this.form.get('date')
  }
  get ageField() {
    return this.form.get('age')
  }
  get categoryField() {
    return this.form.get('category')
  }
  get tagsField() {
    return this.form.get('tags')
  }
  get agreementField() {
    return this.form.get('agreement')
  }
  get genderField() {
    return this.form.get('gender')
  }
  get zoneField() {
    return this.form.get('zone')
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm()
  }

  getNameValue() {
    console.log(this.nameField?.value);
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      this.form.markAllAsTouched()
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastName: [''],
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [new FormControl<Date | null>(null)],
      age: [12, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: ['cat_1'],
      tags: [''],
      agreement: [false, Validators.requiredTrue],
      gender: [''],
      zone: ['']
    })
  }

}
