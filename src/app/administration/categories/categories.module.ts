import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriesResolver } from "./categories-resolver.service";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryEditComponent } from "./category-edit/category-edit.component";
import { CategoryListComponent } from "./category-list/category-list.component";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CategoriesModule {

}
