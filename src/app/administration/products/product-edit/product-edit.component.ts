import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "../../categories/category.model";
import { CategoryService } from "../../categories/category.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: 'adminstration-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy{

  id: number;
  product: Product;
  categories: Category[] = [];
  editMode: boolean;
  editForm: FormGroup;
  private routeSub: Subscription;


  get name () { return this.editForm.get('name'); }
  get imagePath () { return this.editForm.get('imagePath'); }
  get producer () { return this.editForm.get('producer'); }
  get price () { return this.editForm.get('price'); }


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ){}


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.categories = this.categoryService.getCategories();
      this.categoryService.categoriesChanged.subscribe(categories => this.categories = categories);
      if(params.id) {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.product = this.productService.getProduct(this.id);
      }

      this.initForm();
    })
  }


  initForm() {
    const name = this.product ? this.product.name : null;
    const imagePath = this.product ? this.product.imagePath : null;
    const producer = this.product ? this.product.producer : null;
    const price = this.product ? this.product.price : null;
    const category = this.product ? this.product.category : '';


    this.editForm = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.minLength(10)]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      producer: new FormControl(producer, [Validators.required]),
      price: new FormControl(price, [Validators.required, Validators.pattern(/^\d*(\.\d{0,2})?$/)]),
      category: new FormControl(category, Validators.required)
    });
  }


  ngOnDestroy() {
    if(this.routeSub) {
      this.routeSub.unsubscribe();
      this.routeSub = null;
    }
  }


  onSubmit(){
    if(this.editForm.valid){
      const values = this.editForm.value;

      if(this.editMode){
        this.productService.updateProduct(this.id, values).subscribe();
      } else {
        this.productService.addProduct(values).subscribe();
      }

      this.cancelEdit();
    }
  }


  cancelEdit(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  onReset() {
    this.editForm.reset(this.product);
  }

}
