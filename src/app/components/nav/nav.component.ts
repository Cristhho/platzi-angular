import { Component, OnInit } from '@angular/core'

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'
import { UsersService } from '../../services/users.service'
import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false
  counter = 0
  profile?: User

  constructor(
    private store: StoreService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((products) => {
      this.counter = products.length
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('christian@google.com', '123456').subscribe((data) => {
      this.profile = data
    })
  }
}
