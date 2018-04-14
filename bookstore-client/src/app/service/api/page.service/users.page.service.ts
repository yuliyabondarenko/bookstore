import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { User } from '../../../entity/user';
import { isNullOrUndefined } from 'util';

@Injectable()
export class UsersPageService extends CollectionPageService<User> {
  collectionPath = 'users';

  getUsersPageByUserRole(customerLink, page: number, size: number, sortParam: string) {
    this.searchName = customerLink ? 'findByRoles' : '';
    this.searchParams = customerLink ? `role=${customerLink}` : '';
    this.projection = `projection=view`;

    return this.getCollectionPage(page, size, sortParam);
  }
}
