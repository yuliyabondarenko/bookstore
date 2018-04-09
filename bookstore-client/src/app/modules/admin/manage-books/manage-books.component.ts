import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../../service/api/book.service';
import { Book } from '../../../entity/book';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { BookFormDialogComponent } from './book.form/book.form';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: Array<Book>;
  dataSource: MatTableDataSource<Book>;
  currentPage = environment.adminBooksPage;
  totalElements: number;
  displayedColumns = ['id', 'name', 'price', 'visible'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sort.active = environment.adminBooksSort.active;
    this.sort.direction = environment.adminBooksSort.direction as SortDirection;
    this.getPage(this.currentPage, this.sort);
  }

  sortData(sort: Sort) {
    this.getPage(this.currentPage, sort);
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
            this.getPage(this.currentPage, this.sort);
          });
      });
  }

  getPage(page: Page, sort: Sort): void {
    //FIXME
    const sortParam = `${sort.active},${sort.direction}`;
    this.bookService.getBooks(page.pageIndex, page.pageSize, sortParam)
      .then(response => {
        this.books = response._embedded.books as Book[];
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.totalElements = response.page.totalElements;
        this.currentPage = page;
        this.dataSource.sort = this.sort;
      })
      .catch(error => {
          alert("Can't get books: " + error.message);
        }
      );
  }
}
