package com.nixsolutions.bondarenko.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.web.filter.CorsFilter;

import com.nixsolutions.bondarenko.bookstore.security.SecurityUserDetailsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
  @Autowired
  private CorsFilter corsFilter;

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
        .addFilterBefore(corsFilter, ChannelProcessingFilter.class)
        .headers()
        .frameOptions().disable()
      .and()
        .httpBasic()
      .and()
        .authorizeRequests()
        .anyRequest().authenticated()
      .and()
        .logout().logoutUrl("logout")
      .and()
        .csrf().disable();
  }
}