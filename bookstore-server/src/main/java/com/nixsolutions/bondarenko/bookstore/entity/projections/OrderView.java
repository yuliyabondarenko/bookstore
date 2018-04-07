package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "view", types = Order.class)
public interface OrderView {
  Long getId();

  Date getDate();

  List<BookPriceCountView> getOrderBookPrices();

  Double getTotalAmount();
}
