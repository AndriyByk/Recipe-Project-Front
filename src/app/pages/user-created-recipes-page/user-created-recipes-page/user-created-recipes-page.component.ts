import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-user-created-recipes-page',
  templateUrl: './user-created-recipes-page.component.html',
  styleUrls: ['./user-created-recipes-page.component.css']
})
export class UserCreatedRecipesPageComponent implements OnInit {
  user: IUser;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({user}) => {
      this.user = user;
      this.storeService.createdRecipes.next(this.user.createdRecipes);
    })
  }
}
