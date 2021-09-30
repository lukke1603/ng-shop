import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'form-error',
  template: `
    <span class="text-danger" *ngIf="hasError" >{{ message }}</span>
  `
})
export class FormErrorComponent {
  @Input() control: AbstractControl | boolean;
  @Input() message: string = 'Bitte gib einen gültigen Wert ein';

  get hasError(){
    if(typeof this.control == 'boolean') {
      return this.control;
    } else {
      return (<AbstractControl>this.control).touched && !(<AbstractControl>this.control).valid;
    }
  }

}
