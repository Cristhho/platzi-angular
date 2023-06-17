import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment'
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly APIURL = `${environment.API_URL}/api`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.APIURL}/products`)
  }

  paginateProducts(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.APIURL}/products`, {
      params: {limit, offset},
      context: checkTime()
    }).pipe(
      retry(3),
      map((products) => products.map((item) => ({
        ...item,
        taxes: item.price * 0.12
      })))
    )
  }

  getByCategory(category: string, limit = 10, offset?: number) {
    const params = new HttpParams()
    params.set('limit', limit)
    if (offset) {
      params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.APIURL}/categories/${category}/products`, { params })
  }

  getProductById(id: number|string) {
    return this.http.get<Product>(`${this.APIURL}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status >= HttpStatusCode.InternalServerError) {
            return throwError(() => new Error('Something is wrong on the server'))
          } else if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error(`Product with the id: ${id} does not exist`))
          }

          return throwError(() => new Error('Ups something went wrong!'))
        })
      )
  }

  create(newProduct: CreateProductDTO) {
    return this.http.post<Product>(`${this.APIURL}/products`, newProduct)
  }

  update(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.APIURL}/products/${id}`, dto)
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.APIURL}/products/${id}`)
  }
}
