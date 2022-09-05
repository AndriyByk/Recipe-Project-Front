import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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

  constructor(private authorisationService: AuthorisationService,
              private router: Router,
              private storeService: StoreService) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    })
  }

  signIn(): void {
    let username = this.form.getRawValue().username;
    this.authorisationService.signIn(this.form.getRawValue(), username).subscribe((value) => {
      localStorage.setItem("actualUser", username)
      this.storeService.isUserSignedIn.next(true);
      this.authorisationService.setToken(value.headers.get("authorization"));
      this.router.navigate(['cabinet'])
    })
  }
}

