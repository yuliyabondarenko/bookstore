package com.nixsolutions.bondarenko.bookstore.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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

  @RequestMapping("logout")
  public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken))  {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }

    return new ResponseEntity(HttpStatus.OK);
  }
}
