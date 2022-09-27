import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/user.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {StoreService} from "../../../services/store/store.service";
import {INorm} from "../../../interfaces/entities/user/INorm";

@Component({
  selector: 'app-user-norms-page',
  templateUrl: './user-norms-page.component.html',
  styleUrls: ['./user-norms-page.component.css']
})
export class UserNormsPageComponent implements OnInit {
  private actualUser = 'actualUser';
  user: IUser;
  norms: INorm[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private storeService: StoreService) { }

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


  calculateNorm() {
    this.userService.calculateNorms(this.user).subscribe(value => {
      this.user = value;
      this.storeService.norms.next(value.userNorms);
      this.storeService.norms.subscribe(value1 => this.norms = value1);
    });
  }
}
