import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Storage, getDownloadURL, listAll, ref, uploadBytesResumable } from '@angular/fire/storage'

import { CategoriesService } from '../../../../core/services/categories.service'
import { MyValidators } from '../../../../utils/validators'
import { Category } from '../../../../core/models/category.model'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  isnew = true

  @Input()
  set category(data: Category | undefined) {
    if (data) {
      this.isnew = false
      this.form.patchValue(data)
    }
  }
  @Output() create = new EventEmitter<Category>()
  @Output() update = new EventEmitter<Category>()

  form!: FormGroup
  get nameField() {
    return this.form.get('name')
  }
  get imageField() {
    return this.form.get('image')
  }

  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.buildForm()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      //name: ['', Validators.required, MyValidators.validateCategory(this.categoryService)],
      name: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  save() {
    if (this.form.valid) {
      if (!this.isnew) {
        this.update.emit(this.form.value)
      } else {
        this.create.emit(this.form.value)
      }
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
