import { Book } from './book';
import { Entity } from './entity';

export class ShoppingCartItem implements Entity {

  constructor(public id: number = null,
              public book: Book = null,
              public count: number = null,
              public _links: any = null) {
  }

  collectionName(): string {
    return 'shopcart';
  }
}
