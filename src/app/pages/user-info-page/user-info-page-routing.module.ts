import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserInfoPageComponent} from "./user-info-page/user-info-page.component";

const routes: Routes = [
  {
    path: '', component: UserInfoPageComponent
  },
  {
    path: 'update', loadChildren: () => import('./../user-info-update-page/user-info-update-page.module').then(value => value.UserInfoUpdatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoPageRoutingModule { }
