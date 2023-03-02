import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSuperPageComponent} from "./admin-super-page/admin-super-page.component";
import {UsersResolver} from "../../services/fetches/users/users.resolver";

const routes: Routes = [
  {
    path: ':pageNumber',
    runGuardsAndResolvers: 'always',
    component: AdminSuperPageComponent,
    resolve: {
      users: UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSuperPageRoutingModule {
}
