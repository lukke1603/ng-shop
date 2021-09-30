import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormErrorComponent } from "./form-error.component";
import { MaxLengthPipe } from "./max-length.pipe";
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [
    PricePipe,
    MaxLengthPipe,
    FormErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricePipe,
    MaxLengthPipe,
    FormErrorComponent
  ]
})
export class SharedModule {

}
