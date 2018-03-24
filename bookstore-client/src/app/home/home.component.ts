import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service ';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: String;
  isAuthorizedUser: boolean;
  isUser: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthorizedUser = this.authService.isAuthorized();
    if(this.isAuthorizedUser) {
      this.userName = this.authService.getUserName();
      this.isUser = this.authService.isUser();
      this.isAdmin = this.authService.isAdmin();
    }
  }

  ngOnInit() {
    if ( !this.isAuthorizedUser ) {
      this.router.navigateByUrl('login');
    }
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('login'));
  }
}
