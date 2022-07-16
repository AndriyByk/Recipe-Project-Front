import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddRecipePageComponent} from "./add-recipe-page/add-recipe-page.component";

const routes: Routes = [
  {
    path: '', component: AddRecipePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecipePageRoutingModule { }
