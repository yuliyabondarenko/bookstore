import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-home',
  template: ``
})
export class HomeComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.sessionService.isAdmin) {
      this.router.navigateByUrl('admin');
    } else if (this.sessionService.isUser) {
      this.router.navigateByUrl('user');
    }
  }
}
