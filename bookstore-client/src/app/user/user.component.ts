import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalShoppingCartService } from '../service/local-shopping-cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router,
              private localShoppingCartService: LocalShoppingCartService) { }

  ngOnInit() {
    this.localShoppingCartService.retrieveShoppingCartItems();
  }

  isActive(path: string): boolean {
    return this.router.isActive(`user/${path}`, true);
  }

}
