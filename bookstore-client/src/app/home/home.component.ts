import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: ``
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if ( this.authService.isAdmin ) {
      this.router.navigateByUrl('admin');
    } else if ( this.authService.isUser ) {
      this.router.navigateByUrl('user');
    }
  }
}
