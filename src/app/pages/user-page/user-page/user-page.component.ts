import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/user.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: IUser;
  url: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
    this.activatedRoute.params.subscribe(({id}) =>{
      this.userService.getById(id).subscribe(value => this.user = value);
    })
  }



}
