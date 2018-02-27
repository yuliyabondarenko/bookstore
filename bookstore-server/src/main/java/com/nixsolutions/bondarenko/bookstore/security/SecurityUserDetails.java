package com.nixsolutions.bondarenko.bookstore.security;

import java.util.Arrays;
import java.util.Collection;

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
    return Arrays.asList(new SimpleGrantedAuthority(user.getRole().getName()));
  }

  @Override
  public String getPassword()
  {
    return this.user.getPassword();
  }

  @Override
  public String getUsername()
  {
    return this.user.getUsername();
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
