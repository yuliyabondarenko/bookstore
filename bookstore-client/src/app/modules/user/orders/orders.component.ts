import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../entity/order';
import { OrderService } from '../../../service/api/order.service';
import { MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { Page } from '../../../../page';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: MatTableDataSource<Order>;
  currentPage = environment.ordersPage;
  totalOrderCount: number;
  displayedColumns = ['id', 'books', 'totalAmount', 'date'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.sort.active = environment.ordersSort.active;
    this.sort.direction = environment.ordersSort.direction as SortDirection;

    this.getPage(this.currentPage, this.sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;
    this.orderService.getOrders(SessionService.userId, page.pageIndex, page.pageSize, sortParam)
      .then(response => {
        const orders = response['_embedded'].orders as Order [];
        this.orders = new MatTableDataSource<Order>(orders);
        this.totalOrderCount = response.page.totalElements;
        this.currentPage = page;

        this.orders.sort = this.sort;
      });
  }

  sortOrders(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }
}
