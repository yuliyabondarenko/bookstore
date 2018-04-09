export class Book {
  constructor(public id: number = null,
              public name: string = null,
              public price: number = null,
              public photo: string = null,
              public visible: boolean = true,
              public _links: any = null) {
  }
}
