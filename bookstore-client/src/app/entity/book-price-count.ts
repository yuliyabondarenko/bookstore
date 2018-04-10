import { ShoppingCartItem } from './shopping-cart-item';

export class BookPriceCount {
  constructor(public book: any = null,
              public price: number = null,
              public count: number = null,
              public _links: any = null) {
  }

  static of(shoppingCartItem: ShoppingCartItem): BookPriceCount {
    return new BookPriceCount(
      shoppingCartItem.book._links.self.href,
      shoppingCartItem.book.price,
      shoppingCartItem.count
    );
  }
}
