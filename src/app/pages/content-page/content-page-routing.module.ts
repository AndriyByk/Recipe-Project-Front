import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipes', loadChildren:() => import('./../recipes-page/recipes-page.module').then(value => value.RecipesPageModule)
  },
  {
    path: 'recipe', loadChildren:() => import('./../recipe-page/recipe-page.module').then(value => value.RecipePageModule)
  },
  {
    path: 'cabinet', loadChildren:() => import('./../cabinet-page/cabinet-page.module').then(value => value.CabinetPageModule)
  },
  {
    path: 'add-recipe', loadChildren:() => import('./../add-recipe-page/add-recipe-page.module').then(value => value.AddRecipePageModule)
  },
  {
    path: 'user', loadChildren:() => import('./../user-page/user-page.module').then(value => value.UserPageModule)
  },
  {
    path: 'update-recipe', loadChildren: () => import('./../update-recipe-page/update-recipe-page.module').then(value => value.UpdateRecipePageModule)
  },
  {
    path: '', redirectTo: 'recipes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentPageRoutingModule { }
