import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/api/login.service';
import { SessionService } from '../../service/session.service';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };

  @ViewChild('loginForm') loginForm: HTMLFormElement;
  matcher: ErrorStateMatcher;
  globalError: string;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm.valueChanges
      .subscribe(() => this.globalError = null);

    if (SessionService.isAuthorized) {
      this.loginService.logout();
    }
  }

  login(credentials) {
    this.loginService.authenticate(credentials)
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        const errorMsg = error && error.message ? error.message : '';
        this.globalError = `Login failed. ${errorMsg}`;
      });
  }
}
