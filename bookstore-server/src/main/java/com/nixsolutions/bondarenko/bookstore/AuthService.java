package com.nixsolutions.bondarenko.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @PreAuthorize("isAuthenticated()")
  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return userRepository.findOneByEmail(authentication.getName());
  }
}
