import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "../../categories/category.model";
import { CategoryService } from "../../categories/category.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: 'administration-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy{

  public products: Product[];
  public categories: Category[];
  private productSub: Subscription;
  private categorySub: Subscription;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.productSub = this.productService.productsChanged.subscribe(products => this.products = products);
    this.categorySub = this.categoryService.categoriesChanged.subscribe(categories => this.categories = categories);

    this.products = this.productService.getProducts();
    this.categories = this.categoryService.getCategories();
  }


  ngOnDestroy() {
    if(this.productSub) {
      this.productSub.unsubscribe();
      this.productSub = null;
    }
  }


  onDelete(event: Event, index: number) {
    event.stopPropagation();
    this.productService.removeProduct(index).subscribe();
  }



}
