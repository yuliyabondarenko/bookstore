package com.nixsolutions.bondarenko.bookstore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nixsolutions.bondarenko.bookstore.AuthService;
import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.repository.ShoppingCartRepository;

@RestController
@RequestMapping("api/shopcart/clean")
public class ShoppingCartController {
  @Autowired
  private ShoppingCartRepository shoppingCartRepository;

  @Autowired
  private AuthService authService;

  @RequestMapping(name="clean")
  public void cleanUserCart() {
    User currentUser = authService.getCurrentUser();
    shoppingCartRepository.delete(shoppingCartRepository.findByUserEmail(currentUser.getEmail()));
  }
}
