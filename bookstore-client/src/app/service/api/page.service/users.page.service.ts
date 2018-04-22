import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { User } from '../../../entity/user';

@Injectable()
export class UsersPageService extends CollectionPageService<User> {
  collectionPath = 'users';

  getUsersPageByRole(roleName: string, page: number, size: number, sortParam: string) {
    this.searchName = roleName ? 'findByRolesName' : '';
    this.searchParams = roleName ? `role=${roleName}` : '';
    this.projection = `projection=view`;

    return this.getCollectionPage(page, size, sortParam);
  }
}
