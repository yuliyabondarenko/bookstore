import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { Order } from '../../../entity/order';

@Injectable()
export class OrdersPageService extends CollectionPageService<Order> {
  collectionPath = 'orders';

  getOrderPageByUser(userId, page: number, size: number, sortParam: string){
    this.searchName = 'findByUserId';
    this.searchParams = `userId=${userId}`;
    this.projection = `projection=view`;

    return this.getCollectionPage(page, size, sortParam);
  }
}
