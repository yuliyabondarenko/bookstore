export class ShoppingCartItemDTO {
  constructor(public id: number = null,
              public user: string = null,
              public book: string = null,
              public count: number = null) {
  }
}
