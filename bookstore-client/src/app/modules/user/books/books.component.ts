import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../../entity/book';
import { BookService } from '../../../service/api/book.service';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { MatSort, Sort, SortDirection } from '@angular/material';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book>;
  currentPage = environment.userBooksPage;
  totalBookCount: number;

  displayedColumns = ['name', 'price', 'absent'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.sort.active = environment.userBooksSort.active;
    this.sort.direction = environment.userBooksSort.direction as SortDirection;

    this.getPage(this.currentPage, this.sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;
    this.bookService.getBooks(page.pageIndex, page.pageSize, sortParam)
      .then(response => {
        this.books = response._embedded.books as Book[];
        this.totalBookCount = response.page.totalElements;
        this.currentPage = page;
      })
      .catch(error => {
          alert("Can't get books: " + error.message);
        }
      );
  }

  sortBooks(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }
}
