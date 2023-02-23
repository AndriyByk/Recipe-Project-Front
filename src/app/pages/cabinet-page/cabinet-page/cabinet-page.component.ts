import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../interfaces/entities/user/IUser";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.css']
})
export class CabinetPageComponent implements OnInit {
  user: IUser;

  constructor() { }

  ngOnInit(): void {
    // let username: string|null = localStorage.getItem("actualUser");
    // if (username != null) {
    //   this.userService.getByUsername(username).subscribe(value => this.user = value)
    // }
  }
}
