package com.nixsolutions.bondarenko.bookstore.controllers;

import com.nixsolutions.bondarenko.bookstore.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/shopcart/clean")
public class ShoppingCartResourse {
  @Autowired
  private ShoppingCartRepository shoppingCartRepository;

  @RequestMapping(name="clean")
  public void cleanUserCart(Long userId) {
    shoppingCartRepository.delete(shoppingCartRepository.findByUserId(userId));
  }
}
