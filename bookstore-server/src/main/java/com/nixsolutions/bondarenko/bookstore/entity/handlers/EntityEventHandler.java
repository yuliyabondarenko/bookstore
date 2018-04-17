package com.nixsolutions.bondarenko.bookstore.entity.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;
import com.nixsolutions.bondarenko.bookstore.AuthService;

@RepositoryEventHandler
public class EntityEventHandler {

  @Autowired
  private AuthService authService;

  @HandleBeforeCreate
  public void handleOrderCreate(Order order) {
    order.setUser(authService.getCurrentUser());
  }

  @HandleBeforeCreate
  public void handleShoppingCartItemCreate(ShoppingCartItem item) {
    item.setUser(authService.getCurrentUser());
  }
}
