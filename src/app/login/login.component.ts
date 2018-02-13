import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth/auth.service';

const LOGIN_PATTERN = /^[a-zA-Z]+$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9]+$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  authenticationFailed: boolean;

  get formLogin() {
    return this.form.controls.login;
  }

  get formPassword() {
    return this.form.controls.password;
  }

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      login: ['', [Validators.required, Validators.pattern(LOGIN_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
  }

  submitForm(form: FormGroup) {
    let login = form.controls.login.value;
    let password = form.controls.password.value;

    this._authService.login(login, password).subscribe(user => {
      this._router.navigate(['']);
    }, error => {
      if (!this.authenticationFailed) {
        this.authenticationFailed = true;
      }
    });
  }

}
