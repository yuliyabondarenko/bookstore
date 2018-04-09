import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../service/api/book.service';
import { Book } from '../../../entity/book';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BookFormDialogComponent } from './book.form/book.form';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  openCreateBookDialog(): void {
    const dialogConfig = {width: '250px', data: {book: new Book()}} as MatDialogConfig;
    const dialogRef = this.dialog.open(BookFormDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .toPromise()
      .then(book => {
        if (!book) return;
        this.bookService.create(book)
          .then(() => {
            this.getBooks();
          });
      });
  }

  getBooks(): void {
    //FIXME
    this.bookService.getBooks(0, 20, null)
      .then(response => {
        this.books = response._embedded.books as Book[];
      })
      .catch(error => {
          alert("Can't get books: " + error.message);
        }
      );
  }
}
