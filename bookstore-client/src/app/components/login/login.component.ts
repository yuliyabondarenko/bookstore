import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/api/login.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormError: string;

  credentials = {username: '', password: ''};

  constructor(private loginService: LoginService,
              private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.loginFormError = null;
    });
  }

  ngOnInit() {
    if(SessionService.isAuthorized) {
      this.loginService.logout();
    }
  }

  onSubmit(loginForm) {
    this.credentials.username = loginForm.get('email').value;
    this.credentials.password = loginForm.get('password').value;

    this.loginService.authenticate(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        const errorMsg =  error && error.message ? error.message : '';
        this.loginFormError = `Login failed. ${errorMsg}`;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
