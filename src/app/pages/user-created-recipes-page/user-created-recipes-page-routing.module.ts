import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreatedRecipesPageComponent} from "./user-created-recipes-page/user-created-recipes-page.component";

const routes: Routes = [
  {
    path: '', component: UserCreatedRecipesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreatedRecipesPageRoutingModule {
}
