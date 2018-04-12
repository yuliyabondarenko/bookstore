import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../../entity/book';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { MatSort, Sort, SortDirection } from '@angular/material';
import { BooksPageService } from '../../../service/api/page.service/books.page.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book>;
  currentPage = environment.customerBooksPage;
  totalElements: number;

  displayedColumns = ['name', 'price', 'absent'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private collectionPageService: BooksPageService) {
  }

  ngOnInit() {
    this.sort.active = environment.customerBooksSort.active;
    this.sort.direction = environment.customerBooksSort.direction as SortDirection;

    this.getPage(this.currentPage, this.sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;

    this.collectionPageService.getCollectionPage(page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
        this.books = collectionPage.collection;
        this.totalElements = collectionPage.totalElements;
        this.currentPage = page;
      });
  }

  sortBooks(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }
}
