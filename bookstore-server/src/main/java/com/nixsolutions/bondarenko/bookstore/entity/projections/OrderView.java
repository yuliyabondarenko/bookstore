package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;
import java.util.OptionalDouble;

@Projection(name = "view", types = Order.class)
public interface OrderView {
  Long getId();

  Date getDate();

  List<BookPriceCountView> getOrderBookPrices();

  default Double getTotalAmount() {
    OptionalDouble total = this.getOrderBookPrices().stream()
        .mapToDouble(BookPriceCountView::getPrice)
        .reduce((a, b) -> a + b);

    return total.isPresent() ? total.getAsDouble() : 0.0;
  }
}
