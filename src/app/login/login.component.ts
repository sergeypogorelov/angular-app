import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  get formLogin() {
    return this.form.controls.login;
  }

  get formPassword() {
    return this.form.controls.password;
  }

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      login: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  submitForm(form: FormGroup) {
    console.log(form);
  }

}
