import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _shoppingCart: Product[] = []
    public get shoppingCart() : Product[] {
      return this._shoppingCart;
    }

  private myCart = new BehaviorSubject<Product[]>([])

  myCart$ = this.myCart.asObservable()

  constructor() { }

  addProduct(product: Product) {
    this._shoppingCart.push(product)
    this.myCart.next(this._shoppingCart)
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, item) => sum + item.price,0)
  }
}
