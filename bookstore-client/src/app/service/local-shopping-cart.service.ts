import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../entity/shopping-cart-item';
import { ShoppingCartService } from './api/shopping.cart.service';
import { Book } from '../entity/book';
import { ShoppingCartItemDTO } from '../entity/shopping-cart-item-dto';
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
        sessionStorage.shoppingCart = JSON.stringify(cartItems);
        return cartItems;
      });
  }

  deleteItem(item: ShoppingCartItem): Promise<any> {
    return this.shoppingCartService.deleteItem(item);
  }

  addBookToCart(book: Book) {
    const userLink = LinkHelper.getUserLink(SessionService.userId);
    const itemDto = new ShoppingCartItemDTO(null, userLink, book._links.self.href, 1);
    return this.shoppingCartService.createItem(itemDto)
      .then(() => this.fetchShoppingCartItems()
      );
  }

  updateCount(item: ShoppingCartItem, targetCount: number = null) {
    const userLink = LinkHelper.getUserLink(SessionService.userId);
    const itemDto = new ShoppingCartItemDTO(item.id, userLink, item.book._links.self.href, targetCount);
    return this.shoppingCartService.updateItem(itemDto).then(
      () => this.fetchShoppingCartItems()
    );
  }

  isBookInCart(book: Book) {
    return this.storedShoppingCartItems.some(item => item.book.id === book.id);
  }

  get storedShoppingCartItems(): ShoppingCartItem [] {
    return JSON.parse(sessionStorage.shoppingCart) as ShoppingCartItem [];
  }
}
