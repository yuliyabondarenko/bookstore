import { Component, OnInit } from '@angular/core';
import { BookPriceCount } from '../../entity/book-price-count';
import { ShoppingCartService } from '../../service/shopping.cart.service';
import { OrderService } from '../../service/order.service';
import { Order } from '../../entity/order';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service ';
import { Config } from '../../config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: BookPriceCount [];
  displayedColumns = ['bookName', 'price', 'count'];

  constructor(private shoppingCartService: ShoppingCartService,
              private ordersService: OrderService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getShopCartItems();
  }

  getShopCartItems() {
    this.shoppingCartService.getShopCartItems().then(response => {
      debugger;
      this.shoppingCartItems = response['_embedded'].shopcart as BookPriceCount [];
    })
  }

  performOrder() {
    let order = this.buildOrder();

    this.ordersService.createOrder(order, () => {
      this.router.navigateByUrl('user/orders');
    });
  }

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
      `${Config.host}/users/${this.authService.userId}`,
      new Date(Date.now()),
      orderBookPriceItems
    )
  }


  clearCart() {
    alert("Oh! I can't clear yet");
  }

}
