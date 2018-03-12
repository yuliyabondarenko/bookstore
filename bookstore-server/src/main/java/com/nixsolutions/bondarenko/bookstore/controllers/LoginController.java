package com.nixsolutions.bondarenko.bookstore.controllers;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController
{
  @RequestMapping("user")
  public Principal user(Principal user)
  {
    return user;
  }
}
