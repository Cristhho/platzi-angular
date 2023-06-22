import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage, getDownloadURL, listAll, ref, uploadBytesResumable } from '@angular/fire/storage';

import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  form!: FormGroup
  get nameField() {
    return this.form.get('name')
  }
  get imageField() {
    return this.form.get('image')
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private router: Router,
    private storage: Storage
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  save() {
    if (this.form.valid) {
      const data = this.form.value
      this.categoryService.create(data)
        .subscribe(() => this.router.navigate(['/admin/categories']))
    } else {
      this.form.markAllAsTouched()
    }
  }

  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement
    const imageFile = target.files?.item(0) as File
    const name = `${imageFile.name}`
    const fileRef = ref(this.storage, name)
    const task = uploadBytesResumable(fileRef, imageFile)
    task.then(() => {
      listAll(fileRef).then(async () => {
        const url = await getDownloadURL(fileRef)
        this.imageField?.setValue(url)
      })
    })
  }

}
