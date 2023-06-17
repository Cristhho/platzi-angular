import { Component, OnInit } from '@angular/core'

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'
import { CategoriesService } from '../../services/categories.service'
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
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.store.myCart$.subscribe((products) => {
      this.counter = products.length
    })
    this.getCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  login() {
    this.authService.loginAndGet('christian@google.com', '123456').subscribe((data) => {
      this.profile = data
    })
  }

  getCategories() {
    this.categoriesService.getAll()
      .subscribe((data) => this.categories = data)
  }
}
