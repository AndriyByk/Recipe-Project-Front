import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store/store.service";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {Router} from "@angular/router";
import {ISearchDetailsOfRecipes} from "../../../interfaces/pages/ISearchDetailsOfRecipes";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  searchDetails: ISearchDetailsOfRecipes;
  pageInfo: IPageInfo;
  pageSize: number = 10;

  constructor(private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.storeService.pageInfo.subscribe(value => this.pageInfo = value)
  }

//======================================================================
  goFirstPage() {
    if (this.pageInfo.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfo.totalPages, this.pageInfo.totalElements);
      this.paginateFilter();
    }
  }

  goPreviousPage() {
    if (this.pageInfo.currentPage > 0) {
      this.updatePageInfo(this.pageInfo.currentPage - 1, this.pageInfo.totalPages, this.pageInfo.totalElements);
      this.paginateFilter();
    }
  }

  goNextPage() {
    if (this.pageInfo.currentPage < this.pageInfo.totalPages - 1) {
      this.updatePageInfo(this.pageInfo.currentPage + 1, this.pageInfo.totalPages, this.pageInfo.totalElements);
      this.paginateFilter();
    }
  }

  goLastPage() {
    if (this.pageInfo.currentPage != this.pageInfo.totalPages - 1) {
      this.updatePageInfo(this.pageInfo.totalPages - 1, this.pageInfo.totalPages, this.pageInfo.totalElements);
      this.paginateFilter();
    }
  }

//======================================================================

  paginateFilter() {
    this.storeService.searchDetails.subscribe(value => {
      this.searchDetails = value;
      this.navigate();
    })
  }

  updatePageInfo(currentPage: number, totalPages: number, totalRecipes: number): void {
    this.storeService.pageInfo.next({
      currentPage: currentPage,
      totalPages: totalPages,
      totalElements: totalRecipes
    });
  }

  navigate() {
    this.router.navigate(['recipes/find-and-sort', this.pageInfo.currentPage], {
      queryParams: {
        categoryId: this.searchDetails.recipeCategoryId,
        title: this.searchDetails.title,
        nutrientId: this.searchDetails.nutrientId,
        pageSize: this.pageSize
      }
    })
  }
}
