import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/fetches/users/user.service";
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {StoreService} from "../../../services/store/store.service";
import {INorm} from "../../../interfaces/entities/user/INorm";
import {INormSorted} from "../../../interfaces/entities/user/INormSorted";

@Component({
  selector: 'app-user-norms-page',
  templateUrl: './user-norms-page.component.html',
  styleUrls: ['./user-norms-page.component.css']
})
export class UserNormsPageComponent implements OnInit {
  user: IUser;
  norms: INorm[];
  normsSorted: INormSorted = {
    energy: [],
    minerals: [],
    vitamins: [],
    organics: []
  }

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({user}) => {
      this.user = user;
      if (user.userNorms) {
        for (let i = 0; i < user.userNorms.length; i++) {
          if (i == 0) {
            this.normsSorted.energy.push(user.userNorms[i])
          } else if (i >= 1 && i < 4) {
            this.normsSorted.organics.push(user.userNorms[i])
          } else if (i >= 4 && i < 16) {
            this.normsSorted.vitamins.push(user.userNorms[i])
          } else {
            this.normsSorted.minerals.push(user.userNorms[i])
          }
        }
      }
    });
  }

  calculateNorm() {
    this.userService.calculateNorms(this.user).subscribe(value => {
      this.user = value;
      this.storeService.norms.next(value.userNorms);
      this.storeService.norms.subscribe(value1 => this.norms = value1);
    });
  }
}
