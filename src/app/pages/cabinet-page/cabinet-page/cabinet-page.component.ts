import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../interfaces/entities/user/IUser";
import {StoreService} from "../../../services/store/store.service";
import {UserService} from "../../../services/fetches/users/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.css']
})
export class CabinetPageComponent implements OnInit {
  user: IUser;

  pageNumberOfFavorite: number;
  pageNumberOfCreated: number;
  pageSizeOfCreated: number;
  pageSizeOfFavorite: number;

  constructor(private storeService: StoreService,
              private userService:UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.storeService.pageNumberOfCreated.subscribe(value => this.pageNumberOfCreated = value);
    this.storeService.pageNumberOfFavorite.subscribe(value => this.pageNumberOfFavorite = value);
    this.storeService.pageSizeOfCreated.subscribe(value => this.pageSizeOfCreated = value);
    this.storeService.pageSizeOfFavorite.subscribe(value => this.pageSizeOfFavorite = value);

    this.activatedRoute.data.subscribe(({user}) => this.user = user);
  }
}
