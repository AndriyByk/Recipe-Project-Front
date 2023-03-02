import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../../services/store/store.service";
import {UserService} from "../../../services/fetches/users/user.service";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {ISearchDetailsUsers} from "../../../interfaces/pages/ISearchDetailsUsers";

@Component({
  selector: 'app-admin-super-page',
  templateUrl: './admin-super-page.component.html',
  styleUrls: ['./admin-super-page.component.css']
})
export class AdminSuperPageComponent implements OnInit {
  users: IUser[];
  user: IUser;
  url: string;
  meme1 = null;
  meme2 = null;
  form: FormGroup;
  formSearch: FormGroup;
  pageInfoUsers: IPageInfo;
  searchDetailsUsers: ISearchDetailsUsers;
  pageSizeUsers: number = 50;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private router: Router,
              private userService: UserService) {
    this.createForm();
    this.createSearchForm();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({users}) => {
      this.users = users.users;
      this.user = users.users[0];
      this.storeService.pageInfoUsers.next({
        currentPage: users.currentPage,
        totalPages: users.totalPages,
        totalElements: users.totalElements
      })
    });
    this.url = baseURL + recipeUrl.pictures;
    this.storeService.pageInfoUsers.subscribe(value => this.pageInfoUsers = value)
  }


  private createForm() {
    this.form = new FormGroup({
      role: new FormControl(null)
    })
  }

  private createSearchForm() {
    this.formSearch = new FormGroup({
      username: new FormControl(null),
      roleSearch: new FormControl(null)
    })
  }

  submitForm(): void {
    let {role} = this.form.getRawValue();
    if (role) {
      this.userService.changeRole(this.pageInfoUsers.currentPage, this.pageSizeUsers, this.user.id, role).subscribe(value => this.users = value);
    }
  }

  submitFormSearch(): void {
    this.storeService.searchDetailsUsers.next({});
    this.searchDetailsUsers = this.formSearch.getRawValue();
    this.storeService.searchDetailsUsers.next(this.formSearch.getRawValue());

    this.storeService.pageInfoUsers.next({
      currentPage: 0,
      totalPages: this.pageInfoUsers.totalPages,
      totalElements: this.pageInfoUsers.totalElements
    });

    if (
      this.searchDetailsUsers.role ||
      this.searchDetailsUsers.username ||
      this.searchDetailsUsers.role && this.searchDetailsUsers.username
    ) {
      this.router.navigate(['cabinet/admin-super', this.pageInfoUsers.currentPage], {
        queryParams: {
          role: this.searchDetailsUsers.role,
          pageSize: this.pageSizeUsers,
          username: this.searchDetailsUsers.username
        }
      })
    }

  }

  changeUser(user: IUser) {
    this.user = user;
    // this.storeService.chosenUser.next(user);
  }


  goFirstPage() {
    if (this.pageInfoUsers.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfoUsers.totalPages, this.pageInfoUsers.totalElements);
      this.paginateFilter();
    }
  }

  goPreviousPage() {
    if (this.pageInfoUsers.currentPage > 0) {
      this.updatePageInfo(this.pageInfoUsers.currentPage - 1, this.pageInfoUsers.totalPages, this.pageInfoUsers.totalElements);
      this.paginateFilter();
    }
  }

  goNextPage() {
    if (this.pageInfoUsers.currentPage < this.pageInfoUsers.totalPages - 1) {
      this.updatePageInfo(this.pageInfoUsers.currentPage + 1, this.pageInfoUsers.totalPages, this.pageInfoUsers.totalElements);
      this.paginateFilter();
    }
  }

  goLastPage() {
    if (this.pageInfoUsers.currentPage != this.pageInfoUsers.totalPages - 1) {
      this.updatePageInfo(this.pageInfoUsers.totalPages - 1, this.pageInfoUsers.totalPages, this.pageInfoUsers.totalElements);
      this.paginateFilter();
    }
  }

  paginateFilter() {
    this.storeService.searchDetailsUsers.subscribe(value => {
      this.searchDetailsUsers = value;
      this.navigate();
    })
  }

  updatePageInfo(currentPage: number, totalPages: number, totalRecipes: number): void {
    this.storeService.pageInfoOfFavorite.next({
      currentPage: currentPage,
      totalPages: totalPages,
      totalElements: totalRecipes
    });
  }

  navigate() {
    this.router.navigate(['cabinet/admin-super', this.pageInfoUsers.currentPage], {
      queryParams: {
        title: this.searchDetailsUsers.username,
        pageSize: this.pageSizeUsers,
      }
    })
  }

}
