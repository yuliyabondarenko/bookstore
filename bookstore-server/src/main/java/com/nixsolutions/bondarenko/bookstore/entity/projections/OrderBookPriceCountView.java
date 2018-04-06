package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.OrderBookPrice;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "view", types = OrderBookPrice.class)
public interface OrderBookPriceCountView {
  BookBasic getBook();

  Double getBookPrice();

  Integer getCount();
}
