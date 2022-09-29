import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/fetches/user.service";
import {IUser} from "../../../interfaces/entities/user/IUser";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.css']
})
export class CabinetPageComponent implements OnInit {
  user: IUser;
  // norms: INorm[];

  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    let username = localStorage.getItem("actualUser");
    if (username != null) {
      this.userService.getByUsername(username).subscribe(value => this.user = value)
    }
  }
}
