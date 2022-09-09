import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/user.service";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {Router} from "@angular/router";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.css']
})
export class CabinetPageComponent implements OnInit {
  user: IUser;
  url: string;
  private actualUser = 'actualUser';
  private accessTokenKey = 'access';

  constructor(private userService: UserService,
              private router: Router,
              private storeService: StoreService,
  ) { }

  ngOnInit(): void {
  this.url = baseURL + recipeUrl.pictures;
    let username = localStorage.getItem("actualUser");
    if (username != null) {
      this.userService.getByUsername(username).subscribe(value => this.user = value)
    }
  }

  deleteAccount() {
    this.storeService.isUserSignedIn.next(false);

    localStorage.removeItem(this.actualUser);

    this.userService.deleteById(this.user.id.toString()).subscribe();

    localStorage.removeItem(this.accessTokenKey);

    this.router.navigate(['recipes'])
  }
}
