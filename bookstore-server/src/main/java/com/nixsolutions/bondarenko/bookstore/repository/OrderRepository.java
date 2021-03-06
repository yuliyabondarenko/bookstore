package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import com.nixsolutions.bondarenko.bookstore.entity.projections.OrderView;

@PreAuthorize("hasRole('ROLE_CUSTOMER')")
@RepositoryRestResource(collectionResourceRel = "orders", path = "orders", excerptProjection = OrderView.class)
public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {

  @Override
  @Query("select o from Order o where o.user.email like ?#{principal.username}")
  Page<Order> findAll(Pageable pageable);

  @Override
  @PreAuthorize("hasRole('ROLE_DBA')")
  void delete(Order order);
}