import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionPage } from '../../../model/collection-page';
import { HttpOptions } from '../http-heares-helper';
import { environment } from '../../../../environments/environment';
import { CollectionPageService } from './collection.page.service';
import { Book } from '../../../entity/book';

@Injectable()
export class BooksPageService extends CollectionPageService<Book> {
  collectionPath = 'books';
}
