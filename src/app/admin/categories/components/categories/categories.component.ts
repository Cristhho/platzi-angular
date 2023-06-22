import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Category[]
  cols = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return 1
      }
      return 3
    })
  )

  constructor(
    private categoryService: CategoriesService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.fetchCategories()
  }

  fetchCategories() {
    this.categoryService.getAll()
      .subscribe((data) => this.categories = data)
  }

}
