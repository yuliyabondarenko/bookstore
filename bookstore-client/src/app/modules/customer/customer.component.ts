import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalShoppingCartService } from '../../service/local-shopping-cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private router: Router,
              private localShoppingCartService: LocalShoppingCartService) { }

  ngOnInit() {
    this.localShoppingCartService.fetchShoppingCartItems();
  }

  isActive(path: string): boolean {
    return this.router.isActive(`customer/${path}`, true);
  }

}
