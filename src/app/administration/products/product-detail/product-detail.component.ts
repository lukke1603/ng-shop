import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "../../categories/category.model";
import { CategoryService } from "../../categories/category.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";


@Component({
  selector: 'administration-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy{

  id: number;
  product: Product;
  category: Category;
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ){}


  onDelete(){
    this.productService.removeProduct(this.id).subscribe(() => {
      this.router.navigate(['../'])
    })
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.product = this.productService.getProduct(this.id);
      this.category = this.categoryService.getCategory(this.product.category);
    })


  }

  ngOnDestroy() {
    if(this.routeSub) {
      this.routeSub.unsubscribe();
      this.routeSub = null;
    }
  }

}
