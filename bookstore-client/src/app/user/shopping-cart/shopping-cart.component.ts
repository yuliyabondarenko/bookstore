import { Component, OnInit } from '@angular/core';
import { BookPriceCount } from '../../entity/book-price-count';
import { OrderService } from '../../service/order.service';
import { Order } from '../../entity/order';
import { Router } from '@angular/router';
import { Config } from '../../config';
import { ShoppingCartItem } from '../../entity/shopping-cart-item';
import { LocalShoppingCartService } from '../../local-shopping-cart.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: ShoppingCartItem [];
  displayedColumns = ['bookName', 'price', 'count'];

  constructor(private localShoppingCartService: LocalShoppingCartService,
              private ordersService: OrderService,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
    this.refreshItems();
  }

  refreshItems() {
    this.localShoppingCartService.retrieveShoppingCartItems()
      .then(items => {
        this.shoppingCartItems = items;
      });
  }

  performOrder() {
    let order = this.buildOrder();

    this.ordersService.createOrder(order, () => {
      this.router.navigateByUrl('user/orders');
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
    alert("Oh! I can't clear yet");
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
