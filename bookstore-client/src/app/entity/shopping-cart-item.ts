import { Book } from './book';
import { Entity } from './entity';

export class ShoppingCartItem implements Entity {
  collectionName = 'shopcart';

  constructor(public id: number = null,
              public book: Book = null,
              public count: number = null,
              public _links: any = null) {
  }

}
