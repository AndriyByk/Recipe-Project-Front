import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorisationService} from "../../../services/authorisation/authorisation.service";
import {StoreService} from "../../../services/store/store.service";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private accessTokenKey = 'access';
  private actualUser = 'actualUser';
  signedIn: boolean;

  constructor(private router: Router,
              private authorisationService: AuthorisationService,
              private storeService: StoreService,
              private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.storeService.isUserSignedIn.next(this.authorisationService.isAuthorizedUser());
    this.storeService.isUserSignedIn.subscribe(value => this.signedIn = value);
  }

  logOut() {
    let access = localStorage.getItem(this.accessTokenKey);
    localStorage.removeItem(this.accessTokenKey);
    if (access != null) {
      console.log("username != null")
      this.authorisationService.deleteTokenFromDB(access).subscribe(value => console.log(value));
    }
    this.storeService.isUserSignedIn.next(false);
    localStorage.removeItem(this.actualUser);

    this.signedIn = false;

    this.router.navigate(['sign-in'])
  }

  toMainPage() {
    if (this.router.url == "/recipes") {
      this.recipeService.getAll().subscribe(value => this.storeService.recipes.next(value))
    }
    this.router.navigate(['recipes']);
  }
}
