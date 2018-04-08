import { Book } from './book';

export class BookPriceCount {
  constructor(public book: any = null,
              public price: string = null,
              public count: number = null,
              public _links: any = null) {
  }
}
