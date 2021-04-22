import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

}
