import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../entity/shopping-cart-item';
import { ShoppingCartService } from './api/shopping.cart.service';
import { Book } from '../entity/book';
import { Config } from '../config';
import { ShoppingCartItemDTO } from '../entity/shopping-cart-item-dto';
import { SessionService } from './session.service';

@Injectable()
export class LocalShoppingCartService {
  userId: number;
  userLink :string;

  constructor(private shoppingCartService: ShoppingCartService,
              private sessionService: SessionService) {
    this.userId = this.sessionService.userId; //TODO escape  from this
    this.userLink = `${Config.host}/users/${this.userId}`;
  }

  retrieveShoppingCartItems(): Promise<ShoppingCartItem []> {
    return this.shoppingCartService.getShopCartItems()
      .then(response => {
        const cartItems = response['_embedded'].shopcart as ShoppingCartItem [];
        sessionStorage.shoppingCart = JSON.stringify(cartItems);
        return cartItems;
      })
      .catch(error => {
        alert('Error while fetch Shopping Cart!');
        return [];
      });
  }

  deleteItem(itemId: number) : Promise<any>{
    return this.shoppingCartService.deleteItem(itemId);
  }

  addBookToCart(book: Book) {
    const itemDto = new ShoppingCartItemDTO(null, this.userLink, book._links.self.href, 1);
    return this.shoppingCartService.createItem(itemDto)
      .then(() => this.retrieveShoppingCartItems()
    );
  }

  updateCount(item: ShoppingCartItem, targetCount: number = null) {
      const itemDto = new ShoppingCartItemDTO(item.id, this.userLink, item.book._links.self.href, targetCount);
      return this.shoppingCartService.updateItem(itemDto).then(
        () => this.retrieveShoppingCartItems()
      );
  }

  isBookInCart(book: Book) {
    let items = JSON.parse(sessionStorage.shoppingCart) as ShoppingCartItem [];
    return items.some(item => item.book.id === book.id);
  }
}
