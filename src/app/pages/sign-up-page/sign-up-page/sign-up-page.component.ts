import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserActivityTypeService} from "../../../services/fetches/user-activity-type.service";
import {IActivityType} from "../../../interfaces/categories/IActivityType";
import {UserGenderService} from "../../../services/fetches/user-gender.service";
import {IGender} from "../../../interfaces/categories/IGender";
import {AuthorisationService} from "../../../services/authorisation/authorisation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  form: FormGroup;
  types: IActivityType[];
  genders: IGender[];
  userNameError: string;

  constructor(private userActivityTypeService: UserActivityTypeService,
              private userGenderService: UserGenderService,
              private authorisationService: AuthorisationService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userActivityTypeService.getAll().subscribe(value => this.types = value)
    this.userGenderService.getAll().subscribe(value => this.genders = value)
  }

  createForm(): void {
    this.form = new FormGroup({
      avatar: new FormControl(null),
      name: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      dayOfBirth: new FormControl(null),
      activityTypeId: new FormControl(null),
      height: new FormControl(null),
      weight: new FormControl(null),
      genderId: new FormControl(null),
      username: new FormControl(null,[
        Validators.pattern('^[a-z]{1}[a-z0-9_-]{1,19}$'),
        Validators.required]),
      password: new FormControl(null,[
        Validators.pattern('[a-zA-Z0-9_-]{2,20}'),
        Validators.required]),
      confirmPassword: new FormControl(null,[
        Validators.pattern('[a-zA-Z0-9_-]{2,20}'),
          Validators.required])
    }, [this.checkPassword])
  }

  register():void {
    let rawValue = this.form.getRawValue();
    delete rawValue.confirmPassword;
    rawValue.dateOfRegistration = new Date().toDateString();
    let formData = new FormData();
    formData.append('avatar', this.form.get('avatar')?.value);
    formData.append('pageNumber', '1');
    formData.append('pageSize', '5');
    delete rawValue.avatar;
    console.log(rawValue);
    let ourUser = JSON.stringify(rawValue);

    formData.append('user', ourUser);
    this.authorisationService.register(formData).subscribe(
      // на контролері на беку можна змінити метод пост на войд: повертати шось не обов'язково
      value => this.router.navigate(['sign-in']),
      error => this.userNameError = error.error.username[0]
    );
  }

  // перевірка чи збігаються password і confirmPassword
  checkPassword(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : {different: "паролі не співпадають!"};
  }

  // перевірка картинки: формат, розмір
  // завантажування картинки у форму
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
}
