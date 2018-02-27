package com.nixsolutions.bondarenko.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.nixsolutions.bondarenko.bookstore.security.SecurityUserDetailsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
  private SecurityUserDetailsService userDetailsService;

  public SecurityConfig(SecurityUserDetailsService userDetailsService)
  {
    this.userDetailsService = userDetailsService;
  }

  @Autowired
  public void configAuthBuilder(AuthenticationManagerBuilder builder) throws Exception
  {
    builder.userDetailsService(userDetailsService);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception
  {
    http
        .authorizeRequests()
        .anyRequest().authenticated()
        .and().httpBasic()
        .and().csrf().disable();
  }
}