import { ShoppingCartItem } from '../entity/shopping-cart-item';

export class UserSessionData {
  constructor(public userId: number = null,
              public userName: string = null,
              public roles: Array<string> = [],
              public authorization: string = null,
              public shoppingCartItems: Array<ShoppingCartItem> = []) {
  }
}
