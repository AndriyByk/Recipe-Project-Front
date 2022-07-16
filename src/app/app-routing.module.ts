import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";

let routes: Routes = [
  {
    path: '', loadChildren:() => import('./pages/content-page/content-page.module').then(m => m.ContentPageModule),
  },
  {
    path: 'sign-in', loadChildren:() => import('./pages/sign-in-page/sign-in-page.module').then(value => value.SignInPageModule)
  },
  {
    path: 'sign-up', loadChildren:() => import('./pages/sign-up-page/sign-up-page.module').then(value => value.SignUpPageModule)
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
