import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdministrationComponent } from "./administration.component";
import { CategoriesComponent } from "./categories/categories.component";
import { ProductsComponent } from "./products/products.component";


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', loadChildren: () => import('./products/products.module').then(module => module.ProductsModule) },
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(module => module.CategoriesModule) },
    ]
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {

}
