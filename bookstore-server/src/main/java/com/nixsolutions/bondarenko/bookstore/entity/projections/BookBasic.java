package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.Book;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "basic", types = Book.class)
public interface BookBasic {
  Long getId();

  String getName();

  String getPrice();
}
