import { Component, OnInit } from '@angular/core';
import { Order } from '../../entity/order';
import { OrderService } from '../../service/order.service';
import { Config } from '../../config';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order [];

  itemsPerPage = Config.ordersPerPage;
  page = 1;
  totalOrderCount: number;
  displayedColumns = ['index', 'books', 'total', 'date'];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders(this.page);
  }

  getOrders(page: number) {
    page--; // decrement page number as it begins with 0 in spring-data-rest response

    this.orderService.getOrders(page, this.itemsPerPage)
      .then(response => {
        this.orders = response['_embedded'].orders as Order [];
        this.totalOrderCount = response.page.totalElements;
      });
  }
}
