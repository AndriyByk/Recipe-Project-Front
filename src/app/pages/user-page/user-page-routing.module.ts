import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./user-page/user-page.component";
import {UserByIdResolver} from "../../services/fetches/users/user-by-id.resolver";
import {RecipesCreatedResolver} from "../../services/fetches/recipes/recipes-created.resolver";

const routes: Routes = [
  {
    path: ':id', component: UserPageComponent, resolve: {
      // працює з param id
      user: UserByIdResolver,
      // працює з query id
      // ці id дублюються в url... рішення - викинути звідси param id і юзера шукати по query id
      // або створювати для юзер пейдж окремий резолвер без id
      createdRecipes: RecipesCreatedResolver // використувується ще в UserCreatedRecipesPageComponent
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
