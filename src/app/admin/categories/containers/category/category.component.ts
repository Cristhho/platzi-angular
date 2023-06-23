import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { CategoriesService } from '../../../../core/services/categories.service'
import { Category } from '../../../../core/models/category.model'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category?: Category

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'] as string
      if (id) {
        this.getCategory(id)
      }
    })
  }

  createCategory(data: Category) {
    this.categoryService.create(data)
      .subscribe(() => this.router.navigate(['/admin/categories']))
  }

  private getCategory(id: string) {
    this.categoryService.getById(id).subscribe((data) => {
      this.category = data
    })
  }

  updateCategory(data: Category) {
    this.categoryService.update(this.category!.id, data)
        .subscribe(() => this.router.navigate(['/admin/categories']))
  }
}
