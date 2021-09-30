import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CategoriesResolver } from "../categories/categories-resolver.service";
import { CategoryService } from "../categories/category.service";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductsResolverService } from "./products-resolver.service";
import { ProductsComponent } from "./products.component";


const routes: Route[] = [
  {path: '', component: ProductsComponent, resolve: [ProductsResolverService, CategoriesResolver], children: [
    {path: '', component: ProductListComponent},
    {path: 'new', component: ProductEditComponent, resolve: [CategoriesResolver]},
    {path: ':id/edit', component: ProductEditComponent, resolve: [CategoriesResolver] },
    {path: ':id', component: ProductDetailComponent },
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {

}
