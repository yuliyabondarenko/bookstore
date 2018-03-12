package com.nixsolutions.bondarenko.bookstore.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class LoginController
{
  @RequestMapping("/user")
  public Principal user(Principal user) {
    return user;
  }
}
