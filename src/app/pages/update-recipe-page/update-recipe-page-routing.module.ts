import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UpdateRecipePageComponent} from "./update-recipe-page/update-recipe-page.component";

const routes: Routes = [
  {
    path: ':id', component: UpdateRecipePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRecipePageRoutingModule {
}
