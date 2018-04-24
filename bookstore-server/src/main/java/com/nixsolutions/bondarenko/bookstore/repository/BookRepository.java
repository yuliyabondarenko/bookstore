package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.nixsolutions.bondarenko.bookstore.entity.Book;

@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_ADMIN')")
@RepositoryRestResource(collectionResourceRel = "books", path = "books")
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  <S extends Book> S save(S s);

  @Override
  @PreAuthorize("hasRole('ROLE_DBA')")
  void delete(Book book);
}