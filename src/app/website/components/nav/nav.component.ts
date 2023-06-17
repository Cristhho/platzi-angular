import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service'
import { CategoriesService } from '../../../services/categories.service'
import { User } from 'src/app/models/user.model'
import { Category } from 'src/app/models/category.model'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false
  counter = 0
  profile?: User
  categories: Category[] = []

  constructor(
    private store: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((products) => {
      this.counter = products.length
    })
    this.getCategories()
    this.authService.user$
      .subscribe((user) => this.profile = user)
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123').subscribe()
  }

  getCategories() {
    this.categoriesService.getAll()
      .subscribe((data) => this.categories = data)
  }

  logout() {
    this.authService.logout()
    this.profile = undefined
    this.router.navigate(['/home'])
  }
}
