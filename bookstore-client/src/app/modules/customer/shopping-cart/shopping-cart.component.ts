import { Component, OnInit } from '@angular/core';
import { Order } from '../../../entity/order';
import { Router } from '@angular/router';
import { ShoppingCartItem } from '../../../entity/shopping-cart-item';
import { LocalShoppingCartService } from '../../../service/local-shopping-cart.service';
import { SessionService } from '../../../service/session.service';
import { ShoppingCartService } from '../../../service/api/shopping.cart.service';
import { DataRestService } from '../../../service/api/data.rest.service';
import { OrderUtils } from '../order.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: ShoppingCartItem [];
  displayedColumns = ['bookName', 'price', 'count', 'actions'];
  globalError: string;
  hasAbsentBookError = 'Unable to submit order. Shopping cart contains absent books';
  hasAbsentBook: boolean = false;
  totalAmount: string;

  constructor(private localShoppingCartService: LocalShoppingCartService,
              private shoppingCartService: ShoppingCartService,
              private resourceService: DataRestService<Order>,
              private router: Router) {
  }

  ngOnInit() {
    this.refreshItems();
  }

  refreshItems() {
    this.localShoppingCartService.fetchShoppingCartItems()
      .then(items => {
        this.shoppingCartItems = items;
        this.totalAmount = OrderUtils.calculateTotalAmount(items).toFixed(2);
        this.hasAbsentBook = this.shoppingCartItems.some(item => item.book.absent);
      });
  }

  submitOrder() {
    let order = OrderUtils.buildOrder(this.shoppingCartItems);

    this.resourceService.create(order)
      .then(() => {
        this.router.navigateByUrl('customer/orders');
        this.shoppingCartService.cleanUserCart(SessionService.userId)
          .then(() => this.refreshItems());
      })
      .catch(error => {
        const errorMsg = error && error.message ? error.message : '';
        this.globalError = `Submit order failed. ${errorMsg}`;
      });
  }


  get disableSubmit(): boolean {
    return this.hasAbsentBook || this.isCartEmpty;
  }

  get disableClear(): boolean {
    return this.isCartEmpty;
  }

  get isCartEmpty() {
    return SessionService.shoppingCartItems.length == 0;
  }

  upCount(item: ShoppingCartItem) {
    this.localShoppingCartService.updateCount(item, ++item.count)
      .then(() => this.refreshItems());
  }

  downCount(item: ShoppingCartItem) {
    if (item.count > 1) {
      this.localShoppingCartService.updateCount(item, --item.count)
        .then(() => this.refreshItems());
    }
  }

  removeItem(item: ShoppingCartItem) {
    this.localShoppingCartService.deleteItem(item)
      .then(() => this.refreshItems());
  }

  clearCart() {
    this.shoppingCartService.cleanUserCart(SessionService.userId)
      .then(() => this.refreshItems());
  }
}
