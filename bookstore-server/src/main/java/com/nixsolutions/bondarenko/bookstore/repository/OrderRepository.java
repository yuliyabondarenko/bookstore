package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_CUSTOMER')")
@RepositoryRestResource(collectionResourceRel = "orders", path = "orders")
public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {
  Page<Order> findByUserId(@Param("userId") long userId, Pageable pageable);


  @Override
  @PreAuthorize("hasRole('ROLE_DBA')")
  void delete(Order order);
}