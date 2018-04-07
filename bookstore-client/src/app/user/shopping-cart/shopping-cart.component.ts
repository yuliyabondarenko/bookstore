import { Component, OnInit } from '@angular/core';
import { BookPriceCount } from '../../entity/book-price-count';
import { ShoppingCartService } from '../../service/shopping.cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: BookPriceCount [];
  displayedColumns = ['bookName', 'price', 'count'];

  constructor(private shoppingCartService: ShoppingCartService) {
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
    alert("Oh! I can't yet");
  }

  clearCart() {
    alert("Oh! I can't clear yet");
  }

}
