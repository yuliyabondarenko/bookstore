package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "view", types = ShoppingCartItem.class)
public interface ShopCartView {
  Long getId();

  BookBasic getBook();

  Integer getCount();
}
