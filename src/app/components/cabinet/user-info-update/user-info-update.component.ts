import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IActivityType} from "../../../interfaces/categories/IActivityType";
import {IGender} from "../../../interfaces/categories/IGender";
import {UserActivityTypeService} from "../../../services/fetches/users/user-activity-type.service";
import {UserGenderService} from "../../../services/fetches/users/user-gender.service";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {UserService} from "../../../services/fetches/users/user.service";
import {Router} from "@angular/router";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.css']
})
export class UserInfoUpdateComponent implements OnInit {
  user: IUser;
  form: FormGroup;
  types: IActivityType[];
  genders: IGender[];
  private actualUser = 'actualUser';

  constructor(private userService: UserService,
              private userActivityTypeService: UserActivityTypeService,
              private userGenderService: UserGenderService,
              private router: Router,
              private storeService: StoreService) {
    this.userActivityTypeService.getAll().subscribe(value => this.types = value)
    this.userGenderService.getAll().subscribe(value => this.genders = value)
    let {data} = history.state;
    if (data != undefined) {
      this.user = data;
    } else {
      let username = localStorage.getItem("actualUser");
      if (username != null) {
        this.userService.getByUsername(username).subscribe(value => this.user = value)
      }
    }
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
}
