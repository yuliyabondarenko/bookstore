import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../entity/order';
import { OrderService } from '../../service/order.service';
import { MatPaginator, MatTableDataSource} from '@angular/material';
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
  displayedColumns = ['index', 'books', 'total', 'date'];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: Page) {
    this.orderService.getOrders(page.pageIndex, page.pageSize)
      .then(response => {
        const orders = response['_embedded'].orders as Order [];
        this.orders = new MatTableDataSource<Order>(orders);
        this.totalOrderCount = response.page.totalElements;
        this.currentPage = page;
      });
  }
}
