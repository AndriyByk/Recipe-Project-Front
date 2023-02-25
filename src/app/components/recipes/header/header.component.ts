import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorisationService} from "../../../services/authorisation/authorisation.service";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private accessTokenKey = 'access';
  private actualUser = 'actualUser';
  signedIn: boolean;

  pageSize: number = 10;

  constructor(private router: Router,
              private authorisationService: AuthorisationService,
              private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.isUserSignedIn.next(this.authorisationService.isAuthorizedUser());
    this.storeService.isUserSignedIn.subscribe(value => this.signedIn = value);
  }

  toMainPage() {
    this.storeService.searchDetails.next({});
    this.storeService.pageSize.next(10);
    this.router.navigate(['recipes/all-recipes', 0], {
      queryParams: {
        pageSize: this.pageSize
      }
    });
  }

  logOut() {
    let access = localStorage.getItem(this.accessTokenKey);

    if (access != null) {
      console.log("username != null")
      console.log(access);
      this.authorisationService.deleteTokenFromDB(access).subscribe();
    }

    this.storeService.isUserSignedIn.next(false);

    localStorage.removeItem(this.actualUser);
    localStorage.removeItem(this.accessTokenKey);
    this.signedIn = false;
    this.router.navigate(['sign-in'])
  }
}
