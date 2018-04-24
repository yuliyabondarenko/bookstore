package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import com.nixsolutions.bondarenko.bookstore.entity.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
  @RestResource(exported = false)
  boolean existsByEmail(@Param("email") String username);

  @RestResource(exported = false)
  User findOneByEmail(@Param("email") String username);

  @PreAuthorize("hasRole('ROLE_USER')")
  @Query("select u from user_account u where u.email like ?#{principal.username}")
  User findUserAccount();

  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  void delete(User user);

  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  Page<User> findAll(Pageable pageable);

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  Page<User> findByRolesName(@Param("role") Role role, Pageable pageable);
}