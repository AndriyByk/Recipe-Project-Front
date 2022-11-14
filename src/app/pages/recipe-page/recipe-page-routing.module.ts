import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipePageComponent} from "./recipe-page/recipe-page.component";
import {RecipeByIdResolver} from "../../services/fetches/recipes/recipe-by-id.resolver";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: ':id', component: RecipePageComponent, resolve: {recipe: RecipeByIdResolver}
  },
  {
    path: 'username/:id', component: RecipePageComponent, resolve: {recipe: RecipeByIdResolver, user: UserByUsernameResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipePageRoutingModule {
}
