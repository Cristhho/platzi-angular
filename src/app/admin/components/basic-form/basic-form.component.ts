import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form!: FormGroup
  get nameField() {
    return this.form.get('name')
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

  ngOnInit(): void {
    this.nameField?.valueChanges
    .subscribe(value => {
      console.log(value);
    });
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
    name: ['', [Validators.required, Validators.maxLength(20)]],
    email: [''],
    phone: [''],
    color: ['#000000'],
    date: [''],
    age: [12],
    category: ['cat_1'],
    tags: [''],
    agreement: [false],
    gender: [''],
    zone: ['']
  })
  }

}
