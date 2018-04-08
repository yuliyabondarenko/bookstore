import { Component, OnInit } from '@angular/core';
import { Book } from '../../entity/book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {

    this.bookService.getBooks()
      .then(response => {
        this.books = response._embedded.books as Book[];

      })
      .catch(error => {
          alert("Can't get books: " + error.message);
        }
      );
  }
}
