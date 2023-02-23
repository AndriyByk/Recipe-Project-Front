import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUserShort} from "../../../interfaces/entities/user/IUserShort";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: IUserShort;
  url: string;
  urlToRecipe: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    localStorage.getItem('username')?this.urlToRecipe = "/recipe/username":this.urlToRecipe = "/recipe";

    this.url = baseURL + recipeUrl.pictures;
    this.activatedRoute.data.subscribe(({user}) => this.user = user);
  }
}
