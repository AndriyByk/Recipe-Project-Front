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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentPageRoutingModule { }
