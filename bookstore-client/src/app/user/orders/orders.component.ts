import { Component, OnInit } from '@angular/core';
import { Order } from '../../entity/order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().then(orderItems => {
      return this.orders = orderItems;
    });
  }

}
