import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IActivityType} from "../../../interfaces/categories/IActivityType";
import {IGender} from "../../../interfaces/categories/IGender";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/fetches/users/user.service";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-user-info-update-page',
  templateUrl: './user-info-update-page.component.html',
  styleUrls: ['./user-info-update-page.component.css']
})
export class UserInfoUpdatePageComponent implements OnInit {
  user: IUser;
  form: FormGroup;
  types: IActivityType[];
  genders: IGender[];
  private actualUser = 'actualUser';
  details: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private storeService: StoreService) {
    this.route.data.subscribe(({user, types, genders}) => {
      this.types = types;
      this.genders = genders;
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      avatar: new FormControl(null),
      name: new FormControl(this.user.name),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
      dayOfBirth: new FormControl(this.user.dayOfBirth),
      activityTypeId: new FormControl(this.user.activityTypeDto.id),
      height: new FormControl(this.user.height),
      weight: new FormControl(this.user.weight),
      genderId: new FormControl(this.user.genderDto.id)
    })
  }
  onChange(e: any) {
    let extensionAllowed: any = { "png": true, "jpeg": true, "jpg": true };
    let file = e.target.files[0];
    if (file.size / 1024 / 1024 > 10) {
      alert("File size should be less than 10MB")
      return;
    }
    if (extensionAllowed) {
      let nam = file.name.split('.').pop();
      if (!extensionAllowed[nam]) {
        alert("Please upload " + Object.keys(extensionAllowed) + " file.")
        return;
      }
    }
    this.form.controls["avatar"].setValue(file);
  }

  update() {
    let rawValue = this.form.getRawValue();
    let formData = new FormData();
    if (rawValue.avatar) {
      formData.append('avatar', this.form.get('avatar')?.value);
    }
    delete rawValue.avatar;
    let ourUser = JSON.stringify(rawValue);
    formData.append('user', ourUser);

    let username = localStorage.getItem(this.actualUser);
    if (username) {
      this.userService.updateByUsername(username, formData).subscribe(
        value => this.storeService.user.next(value)
      );
    }
    this.router.navigate(['cabinet/info'])
  }

  showDetails() {
    this.details = !this.details;
  }
}
