import { BookPriceCount } from './book-price-count';

export class Order {
  constructor(public id: number = null,
              public date: Date = null,
              public orderBookPrices: BookPriceCount [] = null,
              public totalAmount: number = null,
              public _links: any = null) {
  }
}
