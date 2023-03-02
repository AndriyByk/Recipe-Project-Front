import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store/store.service";
import {UserService} from "../../../services/fetches/users/user.service";
import {Router} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {
  private actualUser = 'actualUser';
  private accessTokenKey = 'access';
  private adminMode = 'admin-mode';
  user: IUser;
  url: string;
  details: boolean;


  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.storeService.user.subscribe(value => this.user = value)
    this.url = baseURL + recipeUrl.pictures;
    this.details = false;
    // прийшлось видалити, бо після оновлення даних юзера в юзер-інфо-апдейт дані кешувались
    // і показувало старе, хоча в базі даних оновилось
    // let {data} = history.state;
    // if (data != undefined) {
    //   this.user = data;
    //   this.storeService.user.next(data)
    // } else {
    //   let username = localStorage.getItem("actualUser");
    //   if (username != null) {
    //     this.userService.getByUsername(username).subscribe(value => {
    //       this.user = value;
    //       this.storeService.user.next(value)
    //     })
    //   }

    // this.activatedRoute.data.subscribe({
    //     next: ({user}) => this.user = user,
    //     error: err => {
    //       console.log(err)},
    //     complete () { }},
    //   )
    // }
  }

  deleteAccount() {
    this.storeService.isUserSignedIn.next(false);
    localStorage.removeItem(this.actualUser);
    this.userService.deleteById(this.user.id.toString()).subscribe();
    localStorage.removeItem(this.accessTokenKey);
    if (localStorage.getItem(this.adminMode)) {
      localStorage.removeItem(this.adminMode)
    }
    this.storeService.user.next({
      id : 0,
      name : "",
      lastName : "",
      username : "",
      roles: [],
      activityTypeDto : {id: 0, name: "", about: ""},
      avatar: "",
      createdRecipes: [],
      dateOfRegistration: "",
      dayOfBirth: "",
      email: "",
      favoriteRecipes: [],
      genderDto: {id: 0, gender: ""},
      height: 0,
      password: "",
      userNorms: [],
      weight: 0
    })
    this.router.navigate(['recipes'])
  }

  showDetails() {
    this.details = !this.details;
  }
}
