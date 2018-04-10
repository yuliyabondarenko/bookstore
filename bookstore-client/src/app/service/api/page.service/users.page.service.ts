import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { User } from '../../../entity/user';

@Injectable()
export class UsersPageService extends CollectionPageService<User> {
  collectionPath = 'users';
}
