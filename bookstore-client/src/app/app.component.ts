import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if ( !this.isAuthorized ) {
      this.router.navigateByUrl('login');
    }
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('login'));
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  get isUser(): boolean {
    return this.authService.isUser;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  get userName(): String {
    return this.authService.userName;
  }
}
