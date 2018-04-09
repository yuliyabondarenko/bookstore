export class Book {
  constructor(public id: number = null,
              public name: string = null,
              public price: string = null,
              public photo: string = null,
              public visible: boolean = true,
              public _links: any = null) {
  }
}
