package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;

import java.util.List;


@PreAuthorize("hasRole('ROLE_CUSTOMER')")
@RepositoryRestResource(collectionResourceRel = "shopcart", path = "shopcart")
public interface ShoppingCartRepository extends PagingAndSortingRepository<ShoppingCartItem, Long> {

  @Override
  @Query("select i from ShoppingCartItem i where i.user.email like ?#{principal.username}")
  Page<ShoppingCartItem> findAll(Pageable pageable);

  @RestResource(exported = false)
  List<ShoppingCartItem> findByUserEmail(String email);
}