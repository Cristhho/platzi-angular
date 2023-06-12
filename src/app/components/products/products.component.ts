import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []

  shoppingCart: Product[] = []
  total = 0

  showProductDetail = false
  selectedProduct!: Product

  limit = 10
  offset = 0

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ){
    this.shoppingCart = storeService.shoppingCart
  }

  ngOnInit(): void {
    this.loadMore()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  onShowProductDetail(id: number) {
    this.productsService.getProductById(id)
      .subscribe({
        next: (data) => {
          this.selectedProduct = data
          this.toggleProductDetail(true)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  toggleProductDetail(show: boolean) {
    this.showProductDetail = show
  }

  createNewProduct() {
    const prod: CreateProductDTO = {
      title: 'new Product',
      description: 'lorem ipsum',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 80.99,
      categoryId: 1
    }

    this.productsService.create(prod)
      .subscribe((res) => {
        this.products.unshift(res)
      })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo',
      price: 299.99
    }
    const id = this.selectedProduct.id
    this.productsService.update(id, changes)
      .subscribe((res) => {
        const prodIndex = this.products.findIndex((_prod) => _prod.id === id)
        this.products[prodIndex] = res
        this.selectedProduct = res
      })
  }

  deleteProduct() {
    const id = this.selectedProduct.id
    this.productsService.delete(id)
      .subscribe(() => {
        const prodIndex = this.products.findIndex((_prod) => _prod.id === id)
        this.products.splice(prodIndex, 1)
        this.toggleProductDetail(false)
      })
  }

  loadMore() {
    this.productsService.paginateProducts(this.limit, this.offset)
      .subscribe((res) => {
        this.products.push(...res)
        this.offset += this.limit
      })
  }
}
