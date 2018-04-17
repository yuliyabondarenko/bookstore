package com.nixsolutions.bondarenko.bookstore.repository.handlers;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RepositoryEventHandler
public class EntityEventHandler {
  @Autowired
  private UserRepository userRepository;

  @HandleBeforeCreate
  public void handleOrderCreate(Order order) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    order.setUser(userRepository.findOneByEmail(authentication.getName()));
  }

  @HandleBeforeCreate
  public void handleShoppingCartItemCreate(ShoppingCartItem item) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    item.setUser(userRepository.findOneByEmail(authentication.getName()));
  }
}
