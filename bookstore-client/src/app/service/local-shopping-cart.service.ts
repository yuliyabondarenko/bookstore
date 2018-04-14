import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../entity/shopping-cart-item';
import { ShoppingCartService } from './api/shopping.cart.service';
import { Book } from '../entity/book';
import { SessionService } from './session.service';
import { LinkHelper } from './api/link.helper';

@Injectable()
export class LocalShoppingCartService {

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  fetchShoppingCartItems(): Promise<ShoppingCartItem []> {
    return this.shoppingCartService.getShopCartItems(SessionService.userId)
      .then(response => {
        const cartItems = response;
        SessionService.shoppingCartItems = cartItems;
        return cartItems;
      });
  }

  deleteItem(item: ShoppingCartItem): Promise<any> {
    return this.shoppingCartService.deleteItem(item);
  }

  addBookToCart(book: Book) : Promise<any>{
    const userLink = LinkHelper.getUserLink(SessionService.userId);
    const shoppingCartItem = new ShoppingCartItem(null, userLink, book._links.self.href, 1);
    return this.shoppingCartService.createItem(shoppingCartItem);
  }

  updateCount(item: ShoppingCartItem, targetCount: number = null) : Promise<any> {
    const userLink = LinkHelper.getUserLink(SessionService.userId);
    const itemDto = new ShoppingCartItem(item.id, userLink, item.book._links.self.href, targetCount);
    return this.shoppingCartService.updateItem(itemDto)
  }

  isBookInCart(book: Book) {
    return SessionService.getUserSessionData().shoppingCartItems
      .some(item => item.book.id === book.id);
  }
}
