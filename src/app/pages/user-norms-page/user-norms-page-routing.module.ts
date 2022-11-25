import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserNormsPageComponent} from "./user-norms-page/user-norms-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: '', component: UserNormsPageComponent, resolve:
      {
        user: UserByUsernameResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNormsPageRoutingModule { }
