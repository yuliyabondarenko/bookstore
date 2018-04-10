import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../../service/api/book.service';
import { Book } from '../../../entity/book';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { BookFormDialogComponent } from './book.form/book.form';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { CollectionPageService } from '../../../service/api/page.service/collection.page.service';
import { BooksPageService } from '../../../service/api/page.service/books.page.service';

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
  displayedColumns = ['id', 'name', 'price', 'absent', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService,
              public dialog: MatDialog,
              private collectionPageService: BooksPageService) {
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

  openEditBookDialog(book: Book): void {
    const dialogConfig = {width: '500px', data: {book: Object.assign({}, book)}} as MatDialogConfig;
    const dialogRef = this.dialog.open(BookFormDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .toPromise()
      .then(book => {
        if (!book) return;
        this.bookService.update(book)
          .then(() => {
            this.getPage(this.currentPage, this.sort);
          });
      });
  }


  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;

    this.collectionPageService.getCollectionPage(page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
        this.books = collectionPage.collection;
        this.totalElements = collectionPage.totalElements;
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.currentPage = page;
        this.dataSource.sort = this.sort;
      });
  }
}
