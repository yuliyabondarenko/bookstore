import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { Order } from '../../../entity/order';

@Injectable()
export class OrdersPageService extends CollectionPageService<Order> {
  collectionPath = 'orders';

  getOrders(page: number, size: number, sortParam: string){
    return this.getCollectionPage(page, size, sortParam);
  }
}
