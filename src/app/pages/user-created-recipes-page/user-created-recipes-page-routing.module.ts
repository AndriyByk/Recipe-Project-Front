import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreatedRecipesPageComponent} from "./user-created-recipes-page/user-created-recipes-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";
import {RecipesCreatedResolver} from "../../services/fetches/recipes/recipes-created.resolver";

const routes: Routes = [
  {
    path: '', component: UserCreatedRecipesPageComponent, resolve: {
      user: UserByUsernameResolver,
      createdRecipes: RecipesCreatedResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreatedRecipesPageRoutingModule { }
