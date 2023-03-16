import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUserShort} from "../../../interfaces/entities/user/IUserShort";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: IUserShort;
  createdRecipes: IRecipe[];
  url: string;
  urlToRecipe: string;
  pageInfoOfUserCreated: IPageInfo;
  pageSizeOfUserCreated: number;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {

    localStorage.getItem('actualUser') ? this.urlToRecipe = "/recipe/username" : this.urlToRecipe = "/recipe";

    this.url = baseURL + recipeUrl.pictures;
    this.activatedRoute.data.subscribe(({user, createdRecipes}) => {
      this.user = user;
      this.createdRecipes = createdRecipes.recipes;
      this.storeService.pageInfoOfUserCreated.next({
        currentPage: createdRecipes.currentPage,
        totalPages: createdRecipes.totalPages,
        totalElements: createdRecipes.totalElements
      })
      this.storeService.pageInfoOfUserCreated.subscribe(value => this.pageInfoOfUserCreated = value);
      this.storeService.pageSizeOfUserCreated.subscribe(value => this.pageSizeOfUserCreated = value);
    });

  }

  goFirstPage() {
    if (this.pageInfoOfUserCreated.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfoOfUserCreated.totalPages, this.pageInfoOfUserCreated.totalElements);
      this.navigate();
    }
  }

  goPreviousPage() {
    if (this.pageInfoOfUserCreated.currentPage > 0) {
      this.updatePageInfo(this.pageInfoOfUserCreated.currentPage - 1, this.pageInfoOfUserCreated.totalPages, this.pageInfoOfUserCreated.totalElements);
      this.navigate();
    }
  }

  goNextPage() {
    if (this.pageInfoOfUserCreated.currentPage < this.pageInfoOfUserCreated.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfUserCreated.currentPage + 1, this.pageInfoOfUserCreated.totalPages, this.pageInfoOfUserCreated.totalElements);
      this.navigate();
    }
  }

  goLastPage() {
    if (this.pageInfoOfUserCreated.currentPage != this.pageInfoOfUserCreated.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfUserCreated.totalPages - 1, this.pageInfoOfUserCreated.totalPages, this.pageInfoOfUserCreated.totalElements);
      this.navigate();
    }
  }

//======================================================================

  updatePageInfo(currentPage: number, totalPages: number, totalRecipes: number): void {
    this.storeService.pageInfoOfUserCreated.next({
      currentPage: currentPage,
      totalPages: totalPages,
      totalElements: totalRecipes
    });
  }

  navigate() {
    this.router.navigate(['user', this.user.id], {
      queryParams: {
        pageSize: this.pageSizeOfUserCreated,
        pageNumber: this.pageInfoOfUserCreated.currentPage,
        userId: this.user.id
      }
    })
  }
}
