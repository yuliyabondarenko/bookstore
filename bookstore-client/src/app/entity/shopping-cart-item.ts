import { Entity } from './entity';

export class ShoppingCartItem implements Entity {
  collectionName = 'shopcart';

  constructor(public id: number = null,
              public user: any = null,
              public book: any = null,
              public count: number = null,
              public _links: any = null) {
  }

}
