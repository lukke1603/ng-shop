import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { AdministrationComponent } from "./administration.component";


@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
  ],
  exports: [],
  declarations: [
    AdministrationComponent
  ]
})
export class AdministrationModule{

}
