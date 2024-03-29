import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorisationService} from "../../../services/authorisation/authorisation.service";
import {Router} from "@angular/router";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  form: FormGroup;
  userNameOrPasswordError: string;
  username: string;


  constructor(private authorisationService: AuthorisationService,
              private router: Router,
              private storeService: StoreService) {
    this.createForm()
  }

  ngOnInit(): void {
    if (localStorage.getItem('actualUser')) {
      this.router.navigate(['cabinet/info']);
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  signIn(): void {
    let username = this.form.getRawValue().username;
    this.authorisationService.signIn(this.form.getRawValue()).subscribe((value) => {
      let error = value.headers.get("error");
      if (error == null) {
        localStorage.setItem("actualUser", username);
        this.storeService.isUserSignedIn.next(true);
        let authorization = value.headers.get("authorization");
        this.authorisationService.setToken(authorization);
        this.router.navigate(['cabinet/info']);
      } else {
        this.userNameOrPasswordError = error;
      }
    });
  }
}

