import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Category } from "./category.model";


const mapId = map((categories:Category[]) => categories.map((category, index) => {
  category._id = index;
  return category;
}));

@Injectable({providedIn: 'root'})
export class CategoryService {

  private categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();

  constructor(
    private http: HttpClient
  ){}


  fetchCategories() {
    return this.http.get<Category[]>(`${environment.firebaseApiUrl}categories.json`).pipe(
      mapId,
      tap(categories => {
        this.setCategories(categories);
      })
    )
  }


  storeCategories(categories: Category[]){
    return this.http.put<Category[]>(`${environment.firebaseApiUrl}categories.json`, this.categories);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }


  updateCategory(index: number, category: Category) {
    this.categories[index] = category;
    return this.storeCategories(this.categories).pipe(
      mapId,
      tap(categories => {
        this.categories = categories;
        this.categoriesChanged.next(this.categories.slice());
      })
    );
  }


  addCategory(category: Category) {
    this.categories.push(category);
    return this.storeCategories(this.categories).pipe(
      mapId,
      tap(categories => {
        this.categories = categories;
        this.categoriesChanged.subscribe();
      })
    )
  }


  getCategories(){
    return this.categories;
  }


  getCategory(id: number|string){
    return this.categories[id];
  }


  removeCategory(index: number){
    this.categories = this.categories.filter((category, i) => {
      return +i !== +index;
    });

    return this.storeCategories(this.categories).pipe(
      tap(categories => {
        this.categories = categories;
        this.categoriesChanged.next(this.categories.slice());
      })
    );
  }

}
