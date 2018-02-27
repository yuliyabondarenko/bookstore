package com.nixsolutions.bondarenko.bookstore.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;

@Service
public class SecurityUserDetailsService implements UserDetailsService
{
  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
  {
    List<User> byUsername = userRepository.findByUsername(username); //TODO get unique users
    if(byUsername.isEmpty()){
      throw new UsernameNotFoundException("User '" + username + "' not found");
    }
    return new SecurityUserDetails(byUsername.get(0));
  }
}
