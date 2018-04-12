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
    return SessionService.isAuthorized;
  }

  get isCustomer(): boolean {
    return SessionService.isCustomer;
  }

  get isAdmin(): boolean {
    return SessionService.isAdmin;
  }

  get userName(): string {
    return SessionService.userName;
  }

  get shoppingCartItemsCount() {
    return SessionService.itemsInCart ;
  }
}
