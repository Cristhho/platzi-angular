import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from './../../models/product.model';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
  }

  getPaginateProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit && offset != null) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }

    return this.http.get<Product[]>(`${environment.url_api}/products`, { params })
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }
}
