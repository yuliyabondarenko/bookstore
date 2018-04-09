import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/api/login.service';
import { SessionService } from './service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
    if ( !this.isAuthorized ) {
      this.router.navigateByUrl('login');
    }
  }

  logout() {
    this.loginService.logout()
      .then(() => this.router.navigateByUrl('login'));
  }

  get isAuthorized(): boolean {
    return this.sessionService.isAuthorized;
  }

  get isUser(): boolean {
    return this.sessionService.isUser;
  }

  get isAdmin(): boolean {
    return this.sessionService.isAdmin;
  }

  get userName(): String {
    return this.sessionService.userName;
  }
}
