import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-home',
  template: ``
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (SessionService.isAdmin) {
      this.router.navigateByUrl('admin/books');
    } else if (SessionService.isCustomer) {
      this.router.navigateByUrl('customer/books');
    }
  }
}
