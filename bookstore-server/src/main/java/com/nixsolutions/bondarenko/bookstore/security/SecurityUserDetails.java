package com.nixsolutions.bondarenko.bookstore.security;

import java.util.Collection;
import java.util.stream.Collectors;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUserDetails implements UserDetails
{
  private User user;

  public SecurityUserDetails(User user)
  {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities()
  {
    return user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName().name()))
        .collect(Collectors.toList());
  }

  public User getUser() {
    return user;
  }

  @Override
  public String getPassword()
  {
    return this.user.getPassword();
  }

  @Override
  public String getUsername()
  {
    return this.user.getEmail();
  }

  @Override
  public boolean isAccountNonExpired()
  {
    return true;
  }

  @Override
  public boolean isAccountNonLocked()
  {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired()
  {
    return true;
  }

  @Override
  public boolean isEnabled()
  {
    return true;
  }
}
