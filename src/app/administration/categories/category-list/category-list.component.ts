import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "../category.model";
import { CategoryService } from "../category.service";

@Component({
  selector: 'adminstration-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit, OnDestroy{


  categories: Category[] = [];
  private categorySub: Subscription;


  constructor(
    private categoryService: CategoryService
  ){}


  ngOnInit(){
    this.categories = this.categoryService.getCategories();
    this.categorySub = this.categoryService.categoriesChanged.subscribe(categories => this.categories = categories);
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }


  onDelete(index: number) {
    this.categoryService.removeCategory(index).subscribe();
  }

}
