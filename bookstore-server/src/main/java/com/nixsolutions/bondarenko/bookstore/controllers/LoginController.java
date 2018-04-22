package com.nixsolutions.bondarenko.bookstore.controllers;

import java.security.Principal;
import java.util.stream.Collectors;

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
import org.springframework.beans.factory.annotation.Autowired;
import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.model.UserData;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;

@RestController
public class LoginController {
  @Autowired
  private UserRepository userRepository;

  @RequestMapping("user")
  public UserData user(Principal principal) {
    //((SecurityUserDetails)(((UsernamePasswordAuthenticationToken) principal).getPrincipal())).getUser()
    User user = userRepository.findOneByEmail(principal.getName());
    UserData userData = new UserData();
    userData.setUserName(user.getUsername());
    userData.setRoles(user.getRoles().stream()
        .map(UserRole::getName).collect(Collectors.toList()));

    return userData;
  }

  @RequestMapping("logout")
  public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }

    return new ResponseEntity(HttpStatus.OK);
  }
}
