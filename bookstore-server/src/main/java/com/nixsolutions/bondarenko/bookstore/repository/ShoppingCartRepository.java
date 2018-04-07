package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "shopcart", path = "shopcart")
public interface ShoppingCartRepository extends PagingAndSortingRepository<ShoppingCartItem, Long>
{
  List<ShoppingCartItem> findByUserId(@Param("userId") Long userId);
}