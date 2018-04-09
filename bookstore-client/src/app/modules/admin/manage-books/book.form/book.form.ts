import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Book } from '../../../../entity/book';

@Component({
  selector: 'app-dialog',
  templateUrl: './book.form.html',
  styleUrls: ['./book.form.css']
})
export class BookFormDialogComponent implements OnInit {
  book: Book;
  matcher: ErrorStateMatcher;

  constructor(public dialogRef: MatDialogRef<BookFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.book = data.book;
  }

  ngOnInit(): void {
  }
}
