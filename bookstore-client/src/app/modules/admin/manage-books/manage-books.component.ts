import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../service/api/book.service';
import { Book } from '../../../entity/book';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    //FIXME
    // this.bookService.getBooks()
    //   .then(response => {
    //     this.books = response._embedded.books as Book[];
    //
    //   })
    //   .catch(error => {
    //       alert("Can't get books: " + error.message);
    //     }
    //   );
  }
}
