package com.nixsolutions.bondarenko.bookstore.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;

@Service
public class SecurityUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) {
    User user = userRepository.findOneByEmail(username);
    if (user == null) {
      throw new UsernameNotFoundException("User with email '" + username + "' doesn't exist");
    }
    return new SecurityUserDetails(user);
  }
}
