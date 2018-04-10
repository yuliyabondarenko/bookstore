import { Component, OnInit } from '@angular/core';
import { BookPriceCount } from '../../../entity/book-price-count';
import { OrderService } from '../../../service/api/order.service';
import { Order } from '../../../entity/order';
import { Router } from '@angular/router';
import { ShoppingCartItem } from '../../../entity/shopping-cart-item';
import { LocalShoppingCartService } from '../../../service/local-shopping-cart.service';
import { SessionService } from '../../../service/session.service';
import { ShoppingCartService } from '../../../service/api/shopping.cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: ShoppingCartItem [];
  displayedColumns = ['bookName', 'price', 'count', 'actions'];

  constructor(private localShoppingCartService: LocalShoppingCartService,
              private shoppingCartService: ShoppingCartService,
              private ordersService: OrderService,
              private router: Router) {
  }

  ngOnInit() {
    this.refreshItems();
  }

  refreshItems() {
    this.localShoppingCartService.fetchShoppingCartItems()
      .then(items => {
        this.shoppingCartItems = items;
      });
  }

  submitOrder() {
    let order = this.buildOrder();

    this.ordersService.createOrder(order, () => {
      this.router.navigateByUrl('user/orders');
      this.shoppingCartService.cleanUserCart(SessionService.userId).then(() => {
        this.localShoppingCartService.fetchShoppingCartItems();
      });
    });
  }

  //TODO move this logic somewhere
  buildOrder() {
    let orderBookPriceItems = [];
    this.shoppingCartItems.forEach(
      item => {
        if (!item.book.absent) {
          orderBookPriceItems.push(BookPriceCount.of(item));
        }
      }
    );
    let userLink = SessionService.userLink;
    return new Order(null, userLink, new Date(Date.now()), orderBookPriceItems)
  }

  clearCart() {
    this.shoppingCartService.cleanUserCart(SessionService.userId)
      .then(() => {
        this.refreshItems();
      });
  }

  get disableSubmit(): boolean {
    return this.hasAbsentBook() || this.isCartEmpty();
  }

  hasAbsentBook() {
    return this.localShoppingCartService.storedShoppingCartItems
      .some(item => item.book.absent);
  }

  get disableClear(): boolean {
    return this.isCartEmpty();
  }

  private isCartEmpty() {
    return this.localShoppingCartService.storedShoppingCartItems.length == 0;
  }

  upCount(item: ShoppingCartItem) {
    this.localShoppingCartService.updateCount(item, ++item.count);
  }

  downCount(item: ShoppingCartItem) {
    if (item.count > 1) {
      this.localShoppingCartService.updateCount(item, --item.count);
    }
  }

  removeItem(item: ShoppingCartItem) {
    this.localShoppingCartService.deleteItem(item.id)
      .then(() => this.refreshItems());
  }
}
