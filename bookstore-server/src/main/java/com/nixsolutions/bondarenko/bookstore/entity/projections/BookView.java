package com.nixsolutions.bondarenko.bookstore.entity.projections;

import com.nixsolutions.bondarenko.bookstore.entity.Book;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "view", types = Book.class)
public interface BookView {
  Long getId();

  String getName();

  Double getPrice();

  String getPhoto();
}
