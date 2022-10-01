import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/users/user.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";

@Component({
  selector: 'app-user-favorite-recipes-page',
  templateUrl: './user-favorite-recipes-page.component.html',
  styleUrls: ['./user-favorite-recipes-page.component.css']
})
export class UserFavoriteRecipesPageComponent implements OnInit {
  private actualUser = 'actualUser';
  user: IUser;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    let {data} = history.state;
    if (data != undefined) {
      this.user = data;
    } else {
      let username = localStorage.getItem(this.actualUser);
      if (username != null) {
        this.userService.getByUsername(username).subscribe(value => this.user = value)
      }
    }
  }

}
