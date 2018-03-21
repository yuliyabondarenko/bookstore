package com.nixsolutions.bondarenko.bookstore.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;
import com.nixsolutions.bondarenko.bookstore.repository.UserRoleRepository;
import com.nixsolutions.bondarenko.bookstore.validators.annotation.UniqueEmail;

@RestController
@RequestMapping("register")
@Validated
public class RegistrationController
{
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserRoleRepository userRoleRepository;

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<User> register(@RequestBody @Valid @UniqueEmail User user)
  {
    user.setRole(userRoleRepository.findOneByName(Role.USER));
    User newUser = userRepository.save(user);

    return ResponseEntity.ok(newUser);
  }
}
