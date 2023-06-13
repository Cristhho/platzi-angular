import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateUserDTO, User } from '../models/user.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly APIURL = `${environment.API_URL}/api/users`

  constructor(
    private http: HttpClient
  ) { }

  create(user: CreateUserDTO) {
    return this.http.post<User>(this.APIURL, user)
  }

  getAll() {
    return this.http.get<User[]>(this.APIURL)
  }
}
