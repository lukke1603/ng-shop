import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";

@Injectable({providedIn: 'root'})
export class CategoriesResolver implements Resolve<Category[]>{

  constructor(
    private categoryService: CategoryService
  ){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category[] | Observable<Category[]> | Promise<Category[]> {
    const categories = this.categoryService.getCategories();

    if(categories.length) {
      return categories;
    } else {
      return this.categoryService.fetchCategories();
    }
  }

}
