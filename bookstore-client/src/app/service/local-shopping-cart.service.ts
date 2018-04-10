import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../entity/shopping-cart-item';
import { ShoppingCartService } from './api/shopping.cart.service';
import { Book } from '../entity/book';
import { ShoppingCartItemDTO } from '../entity/shopping-cart-item-dto';
import { SessionService } from './session.service';

@Injectable()
export class LocalShoppingCartService {

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  fetchShoppingCartItems(): Promise<ShoppingCartItem []> {
    return this.shoppingCartService.getShopCartItems(SessionService.userId)
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
    const itemDto = new ShoppingCartItemDTO(null, SessionService.userLink, book._links.self.href, 1);
    return this.shoppingCartService.createItem(itemDto)
      .then(() => this.fetchShoppingCartItems()
    );
  }

  updateCount(item: ShoppingCartItem, targetCount: number = null) {
      const itemDto = new ShoppingCartItemDTO(item.id, SessionService.userLink, item.book._links.self.href, targetCount);
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
