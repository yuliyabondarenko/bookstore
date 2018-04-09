import { Component, OnInit } from '@angular/core';
import { BookPriceCount } from '../../../entity/book-price-count';
import { OrderService } from '../../../service/api/order.service';
import { Order } from '../../../entity/order';
import { Router } from '@angular/router';
import { Config } from '../../../config';
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
  displayedColumns = ['bookName', 'price', 'count'];

  constructor(private localShoppingCartService: LocalShoppingCartService,
              private shoppingCartService: ShoppingCartService,
              private ordersService: OrderService,
              private sessionService: SessionService,
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
      this.shoppingCartService.cleanUserCart(this.sessionService.userId).then(() => {
        this.localShoppingCartService.fetchShoppingCartItems();
      });
    });
  }

  //TODO move this logic somewhere
  buildOrder() {
    let orderBookPriceItems = new Array<BookPriceCount>();
    this.shoppingCartItems.forEach(
      item => {
        let bookPriceCount = new BookPriceCount(
          item.book._links.self.href,
          item.book.price,
          item.count,
        );
        orderBookPriceItems.push(bookPriceCount);
      }
    );
    return new Order(
      null,
      `${Config.host}/users/${this.sessionService.userId}`,
      new Date(Date.now()),
      orderBookPriceItems
    )
  }


  clearCart() {
    this.shoppingCartService.cleanUserCart(this.sessionService.userId).then(() => {
      this.shoppingCartItems = [];
    });
  }

  get isEmpty() {
    return !this.shoppingCartItems || this.shoppingCartItems.length == 0;
  }

  upCount(item: ShoppingCartItem) {
    this.localShoppingCartService.updateCount(item, ++item.count);
  }

  downCount(item: ShoppingCartItem) {
    if (item.count == 1) {
      this.localShoppingCartService.deleteItem(item.id)
        .then(() => this.refreshItems());
    } else {
      this.localShoppingCartService.updateCount(item, --item.count);
    }
  }
}
