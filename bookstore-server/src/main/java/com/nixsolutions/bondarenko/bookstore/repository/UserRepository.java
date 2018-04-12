package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
    boolean existsByEmail(@Param("email") String username);
    User findOneByEmail(@Param("email") String username);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(User user);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<User> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Iterable<User> findAll(Sort sort);
}