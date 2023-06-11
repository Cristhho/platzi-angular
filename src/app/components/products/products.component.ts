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

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ){
    this.shoppingCart = storeService.shoppingCart
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe((res) => this.products = res)
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  onShowProductDetail(id: number) {
    this.productsService.getProductById(id)
      .subscribe((res) => {
        this.selectedProduct = res
        this.toggleProductDetail(true)
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
}
