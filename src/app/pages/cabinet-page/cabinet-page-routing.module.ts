import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CabinetPageComponent} from "./cabinet-page/cabinet-page.component";

const routes: Routes = [
  {
    path: '', component: CabinetPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetPageRoutingModule {
}
