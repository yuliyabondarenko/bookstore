import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../entity/order';
import { OrderService } from '../../service/order.service';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Page } from '../../../page';
import { environment } from '../../../environments/environment';

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
    debugger;
    this.sort.active = environment.ordersSort.active;
    this.sort.direction = environment.ordersSort.direction;

    this.getPage(this.currentPage, this.sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;
    this.orderService.getOrders(page.pageIndex, page.pageSize, sortParam)
      .then(response => {
        debugger;
        const orders = response['_embedded'].orders as Order [];
        this.orders = new MatTableDataSource<Order>(orders);
        this.totalOrderCount = response.page.totalElements;
        this.currentPage = page;

        this.orders.sort = this.sort;
      });
  }

  sortOrders(sort: Sort) {
    debugger;
    this.getPage(this.currentPage, sort);
  }
}
