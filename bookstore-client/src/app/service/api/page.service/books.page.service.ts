import { Injectable } from '@angular/core';
import { CollectionPageService } from './collection.page.service';
import { Book } from '../../../entity/book';

@Injectable()
export class BooksPageService extends CollectionPageService<Book> {
  collectionPath = 'books';
}
