import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreatedRecipesPageComponent} from "./user-created-recipes-page/user-created-recipes-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: '', component: UserCreatedRecipesPageComponent, resolve: {user: UserByUsernameResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreatedRecipesPageRoutingModule {
}
