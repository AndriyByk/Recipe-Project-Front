import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../../services/store/store.service";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  recipes: IRecipe[];
  urlToRecipe: string;
  url: string;

  pageInfoUnchecked: IPageInfo;
  pageSizeUnchecked: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.storeService.pageInfoUnchecked.subscribe(value => this.pageInfoUnchecked = value);
    this.storeService.pageSizeUnchecked.subscribe(value => this.pageSizeUnchecked = value);
    localStorage.getItem('actualUser')?this.urlToRecipe = "/recipe/username":this.urlToRecipe = "/recipe";
    this.url = baseURL + recipeUrl.pictures;

    this.activatedRoute.data.subscribe(({uncheckedRecipes})=> {
      this.recipes = uncheckedRecipes.recipes;
      this.storeService.pageInfoUnchecked.next({
        currentPage: uncheckedRecipes.currentPage,
        totalPages: uncheckedRecipes.totalPages,
        totalElements: uncheckedRecipes.totalElements
      })
    })
  }

  goFirstPage() {
    if (this.pageInfoUnchecked.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfoUnchecked.totalPages, this.pageInfoUnchecked.totalElements);
      this.navigate();
    }
  }

  goPreviousPage() {
    if (this.pageInfoUnchecked.currentPage > 0) {
      this.updatePageInfo(this.pageInfoUnchecked.currentPage - 1, this.pageInfoUnchecked.totalPages, this.pageInfoUnchecked.totalElements);
      this.navigate();
    }
  }

  goNextPage() {
    if (this.pageInfoUnchecked.currentPage < this.pageInfoUnchecked.totalPages - 1) {
      this.updatePageInfo(this.pageInfoUnchecked.currentPage + 1, this.pageInfoUnchecked.totalPages, this.pageInfoUnchecked.totalElements);
      this.navigate();
    }
  }

  goLastPage() {
    if (this.pageInfoUnchecked.currentPage != this.pageInfoUnchecked.totalPages - 1) {
      this.updatePageInfo(this.pageInfoUnchecked.totalPages - 1, this.pageInfoUnchecked.totalPages, this.pageInfoUnchecked.totalElements);
      this.navigate();
    }
  }

//======================================================================


  updatePageInfo(currentPage: number, totalPages: number, totalRecipes: number): void {
    this.storeService.pageInfoUnchecked.next({
      currentPage: currentPage,
      totalPages: totalPages,
      totalElements: totalRecipes
    });
  }

  navigate() {
    this.router.navigate(['cabinet/admin', this.pageInfoUnchecked.currentPage], {
      queryParams: {
        pageSize: this.pageSizeUnchecked
      }
    })
  }

}
