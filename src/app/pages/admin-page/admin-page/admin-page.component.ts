import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../../services/store/store.service";
import {baseURL, recipeUrl} from "../../../urls/urls";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  recipes: IRecipe[];
  urlToRecipe: string;
  url: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    localStorage.getItem('actualUser')?this.urlToRecipe = "/recipe/username":this.urlToRecipe = "/recipe";
    this.url = baseURL + recipeUrl.pictures;

    this.activatedRoute.data.subscribe(({uncheckedRecipes})=> {
      this.recipes = uncheckedRecipes.recipes;
    })
  }

}
