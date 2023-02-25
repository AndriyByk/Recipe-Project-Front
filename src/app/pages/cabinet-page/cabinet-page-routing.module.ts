import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CabinetPageComponent} from "./cabinet-page/cabinet-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: '', component: CabinetPageComponent, resolve: {user: UserByUsernameResolver}, children:
      [
        {
          path: 'info',
          loadChildren: () => import('./../user-info-page/user-info-page.module').then(value => value.UserInfoPageModule)
        },
        {
          path: 'created-recipes',
          loadChildren: () => import('./../user-created-recipes-page/user-created-recipes-page.module').then(value => value.UserCreatedRecipesPageModule)
        },
        {
          path: 'favorite-recipes',
          loadChildren: () => import('./../user-favorite-recipes-page/user-favorite-recipes-page.module').then(value => value.UserFavoriteRecipesPageModule)
        },
        {
          path: 'norms',
          loadChildren: () => import('./../user-norms-page/user-norms-page.module').then(value => value.UserNormsPageModule)
        },
        {
          path: '**', redirectTo: 'info', pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetPageRoutingModule {
}
