import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../app.service ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormError: String;

  credentials = {username: '', password: ''};

  constructor(private app: AppService, private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.loginFormError = null;
    });
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {

    this.credentials.username = loginForm.get('email').value;
    this.credentials.password = loginForm.get('password').value;

    this.app.authenticate(this.credentials,
      () => {
        this.successLogin();
      },
      (error) => {
        this.failedLogin(error);
      });
    return false;
  }

  successLogin() {
    this.router.navigateByUrl('/');
  }

  failedLogin(error: any) {
    this.loginFormError = error.message ? error.message : 'Login failed';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
