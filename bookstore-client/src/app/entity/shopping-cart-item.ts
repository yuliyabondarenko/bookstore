import { Book } from './book';

export class ShoppingCartItem {
  constructor(public id: number = null,
              public book: Book = null,
              public count: number = null,
              public _links: any = null) {
  }
}
