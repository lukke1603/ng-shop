import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CategoriesResolver } from "./categories-resolver.service";
import { CategoriesComponent } from "./categories.component";
import { CategoryEditComponent } from "./category-edit/category-edit.component";
import { CategoryListComponent } from "./category-list/category-list.component";


const routes: Route[] = [
  {path: '', component: CategoriesComponent, resolve: [CategoriesResolver], children: [
    {path: '', component: CategoryListComponent},
    {path: 'new', component: CategoryEditComponent},
    {path: ':id/edit', component: CategoryEditComponent},
  ]},
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {

}
