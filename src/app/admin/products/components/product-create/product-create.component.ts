import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage, getDownloadURL, listAll, ref, uploadBytesResumable } from '@angular/fire/storage'

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  form!: FormGroup;
  get nameField() {
    return this.form.get('name')
  }
  get priceField() {
    return this.form.get('price')
  }
  get imageField() {
    return this.form.get('image')
  }

  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private storage: Storage
  ) {
    this.buildForm();
    this.getCategories()
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
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

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: [2, Validators.required]
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe((data) => this.categories = data)
  }

}
