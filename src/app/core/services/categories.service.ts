import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Category } from '../models/category.model';

type CatAvailability = {
  isAvailable: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`)
  }

  create(category: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories`, category)
  }

  update(id: string, category: Omit<Partial<Category>, 'id'>) {
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, category)
  }

  checkCatAvailability(name: string) {
    return this.http.post<CatAvailability>(`${environment.url_api}/categories/availability`, {name})
  }
}
