import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../entity/order';
import { MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { Page } from '../../../../page';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../service/session.service';
import { OrdersPageService } from '../../../service/api/page.service/orders.page.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order>;
  dataSource: MatTableDataSource<Order>;
  currentPage = environment.ordersPage;
  totalElements: number;
  displayedColumns = ['id', 'books', 'totalAmount', 'date'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersPageService: OrdersPageService) {
  }

  ngOnInit() {
    this.sort.active = environment.ordersSort.active;
    this.sort.direction = environment.ordersSort.direction as SortDirection;

    this.getPage(this.currentPage, this.sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;

    this.ordersPageService.getOrderPageByUser(SessionService.userId, page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
        this.orders = collectionPage.collection;
        this.totalElements = collectionPage.totalElements;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.currentPage = page;
        this.dataSource.sort = this.sort;
      });
  }

  sortOrders(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }
}
