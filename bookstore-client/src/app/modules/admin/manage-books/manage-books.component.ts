import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../../entity/book';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { BookFormDialogComponent } from './book.form/book.form';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { BooksPageService } from '../../../service/api/page.service/books.page.service';
import { DataRestService } from '../../../service/api/data.rest.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: Array<Book>;
  dataSource: MatTableDataSource<Book>;
  currentPage = environment.manageBooksPage;
  totalElements: number;
  displayedColumns = ['id', 'name', 'price', 'absent', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private resourceService: DataRestService<Book>,
              public dialog: MatDialog,
              private collectionPageService: BooksPageService) {
  }

  ngOnInit(): void {
    this.sort.active = environment.manageBooksSort.active;
    this.sort.direction = environment.manageBooksSort.direction as SortDirection;
    this.getPage(this.currentPage, this.sort);
  }

  sortData(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }

  openCreateBookDialog(): void {
    const newBook = new Book();
    newBook.photo =  'http://urlid.ru/bao5';

    const dialogConfig = {width: '500px', data: {book: newBook}} as MatDialogConfig;
    const dialogRef = this.dialog.open(BookFormDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .toPromise()
      .then(book => {
        if (!book) return;
        this.resourceService.create(book)
          .then(() => {
            this.getPage(this.currentPage, this.sort);
          }).catch(error => {
          //TODO show validation errors if present;
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
        this.resourceService.update(book)
          .then(() => {
            this.getPage(this.currentPage, this.sort);
          }).catch(error => {
            //TODO show validation errors if present;
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
