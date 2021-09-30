import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  { path: '', redirectTo: 'administration', pathMatch: 'full' },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(module => module.AdministrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
