import { Component, OnInit } from '@angular/core';
import { Book } from '../../entity/book';
import { BookService } from '../../service/book.service';
import { environment } from '../../../environments/environment';
import { Page } from '../../../page';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book>;
  currentPage = environment.userBooksPage;
  totalBookCount: number;
  sort = environment.userBooksSort;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage, environment.userBooksSort);
  }

  getPage(page: Page, sort: any) {
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

  sortBooks(sort: any) {
    this.getPage(this.currentPage, sort);
  }
}
