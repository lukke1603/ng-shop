import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { ProductService } from "./product.service";

@Injectable({providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const products = this.productService.getProducts();

    if(products.length) {
      return products;
    } else {
      return this.productService.fetchProducts();
    }
  }

}
