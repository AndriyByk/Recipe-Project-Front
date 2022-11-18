import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/users/user.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";

@Component({
  selector: 'app-user-created-recipes-page',
  templateUrl: './user-created-recipes-page.component.html',
  styleUrls: ['./user-created-recipes-page.component.css']
})
export class UserCreatedRecipesPageComponent implements OnInit {
  private actualUser = 'actualUser';
  user: IUser;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({user}) => {
      this.user = user;
    })
  }
}
