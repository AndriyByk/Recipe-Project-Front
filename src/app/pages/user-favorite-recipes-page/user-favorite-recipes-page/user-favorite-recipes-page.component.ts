import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let {data} = history.state;
    if (data != undefined) {
      this.user = data;
    } else {
      this.route.data.subscribe(({user}) => this.user = user)
    }
  }

}
