import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Category } from "../category.model";
import { CategoryService } from "../category.service";

@Component({
  selector: 'adminstration-category-detail',
  templateUrl: 'category-edit.component.html'
})
export class CategoryEditComponent implements OnInit, OnDestroy{

  id: number;
  category: Category;
  editForm: FormGroup;
  editMode: boolean;
  private routeSub: Subscription;

  get name(){ return this.editForm.get('name'); }
  get description(){ return this.editForm.get('description'); }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ){}


  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.editMode = false;
      if(params.id){
        this.id = +params.id;
        this.category = this.categoryService.getCategory(this.id);
        this.editMode = true;
      }

      this.initForm();
    })
  }



  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


  initForm() {
    let name = '';
    let description = '';
    if(this.editMode) {
      name = this.category.name;
      description = this.category.description;
    }

    this.editForm = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(description, [Validators.required])
    });
  }


  onSubmit() {
    let obs: Observable<Category[]>;
    if(this.editMode) {
      obs = this.categoryService.updateCategory(this.id, this.editForm.value);
    } else {
      obs = this.categoryService.addCategory(this.editForm.value)
    }
    obs.subscribe(() => {
      this.router.navigate(['/administration/categories']);
    });
  }


  onReset() {
    if(this.editMode) {
      this.editForm.reset(this.category);
    } else {
      this.editForm.reset()
    }
  }


}
