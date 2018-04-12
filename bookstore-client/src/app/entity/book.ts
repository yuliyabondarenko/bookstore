import { Entity } from './entity';

export class Book  implements Entity{
  collectionName = 'books';

  constructor(public id: number = null,
              public name: string = null,
              public price: number = null,
              public photo: string = null,
              public absent: boolean = false,
              public _links: any = null) {
  }
}
