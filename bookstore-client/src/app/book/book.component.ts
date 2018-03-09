import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {Book} from '../entity/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

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
