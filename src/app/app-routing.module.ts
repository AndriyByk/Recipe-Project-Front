import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";

let routes: Routes = [
  {
    path: 'sign-in', loadChildren:() => import('./pages/sign-in-page/sign-in-page.module').then(value => value.SignInPageModule)
  },
  {
    path: 'sign-up', loadChildren:() => import('./pages/sign-up-page/sign-up-page.module').then(value => value.SignUpPageModule)
  },
  {
    path: 'not-found', loadChildren:() => import('./pages/not-found-page/not-found-page.module').then(value => value.NotFoundPageModule)
  },
  {
    path: 'forbidden-page', loadChildren: () => import('./pages/forbidden-page/forbidden-page.module').then(value => value.ForbiddenPageModule)
  },
  {
    path: '', loadChildren:() => import('./pages/content-page/content-page.module').then(m => m.ContentPageModule),
  },
  {
    path: '**', redirectTo: 'not-found', pathMatch: 'full'
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
