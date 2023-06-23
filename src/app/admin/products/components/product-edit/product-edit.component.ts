import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage, getDownloadURL, listAll, ref, uploadBytesResumable } from '@angular/fire/storage'

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup
  get priceField() {
    return this.form.get('price');
  }
  get imageField() {
    return this.form.get('image')
  }

  id: string | null = null;

  categories: Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {
    this.buildForm();
    this.getCategories()
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.productsService.getProduct(this.id)
        .subscribe(product => {
          this.form.patchValue(product);
          this.form.get('category')?.setValue(product.category.id)
        });
      }
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id!, product)
        .subscribe((newProduct) => {
          console.log(newProduct);
          this.router.navigate(['./admin/products']);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
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

  private getCategories() {
    this.categoryService.getAll().subscribe((data) => this.categories = data)
  }

}
