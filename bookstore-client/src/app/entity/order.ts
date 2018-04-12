import { BookPriceCount } from './book-price-count';
import { Entity } from './entity';

export class Order implements Entity{

  constructor(public id: number = null,
              public user: any = null,
              public date: Date = null,
              public orderBookPrices: BookPriceCount [] = null,
              public totalAmount: number = null,
              public _links: any = null) {
  }

  collectionName(): string {
    return 'orders';
  }
}
