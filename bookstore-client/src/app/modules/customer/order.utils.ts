import { Order } from '../../entity/order';
import { ShoppingCartItem } from '../../entity/shopping-cart-item';
import { BookPriceCount } from '../../entity/book-price-count';
import { LinkHelper } from '../../service/api/link.helper';
import { SessionService } from '../../service/session.service';

export class OrderUtils {

  static buildOrder(shoppingCartItems: Array<ShoppingCartItem>): Order {
    let orderBookPriceItems = [];
    shoppingCartItems.forEach(
      item => {
        if (!item.book.absent) {
          orderBookPriceItems.push(BookPriceCount.of(item));
        }
      }
    );
    return new Order(null, new Date(Date.now()), orderBookPriceItems)
  }

  static calculateTotalAmount(shoppingCartItems: Array<ShoppingCartItem>): number {
    return shoppingCartItems
      .map(item => item.book['price'] * item.count)
      .reduce((sum, current) => sum + current, 0);
  }

}
