package com.nixsolutions.bondarenko.bookstore.controllers;

import com.nixsolutions.bondarenko.bookstore.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/shopcart/clean")
public class ShoppingCartController {
  @Autowired
  private ShoppingCartRepository shoppingCartRepository;

  @RequestMapping(name="clean")
  public void cleanUserCart() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    shoppingCartRepository.delete(shoppingCartRepository.findByUserEmail(authentication.getName()));
  }
}
