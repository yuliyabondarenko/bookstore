package com.nixsolutions.bondarenko.bookstore;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.nixsolutions.bondarenko.bookstore.entity.Book;
import com.nixsolutions.bondarenko.bookstore.entity.User;

@Configuration
public class RestConfig extends RepositoryRestConfigurerAdapter {
  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("OPTIONS");
    config.addAllowedMethod("GET");
    config.addAllowedMethod("POST");
    config.addAllowedMethod("PUT");
    config.addAllowedMethod("DELETE");
    configurationSource.registerCorsConfiguration("/**", config);

    return new CorsFilter(configurationSource);
  }

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Book.class, User.class);
  }
}