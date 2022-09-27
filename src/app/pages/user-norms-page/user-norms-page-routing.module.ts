import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserNormsPageComponent} from "./user-norms-page/user-norms-page.component";

const routes: Routes = [
  {
    path: '', component: UserNormsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNormsPageRoutingModule { }
