import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment'
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly APIURL = `${environment.API_URL}/api/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.APIURL}/login`, {email, password})
      .pipe(
        tap((res) => this.tokenService.saveToken(res.access_token))
      )
  }

  profile() {
    return this.http.get<User>(`${this.APIURL}/profile`)
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.profile())
      )
  }

  logout() {
    this.tokenService.removeToken()
  }
}
