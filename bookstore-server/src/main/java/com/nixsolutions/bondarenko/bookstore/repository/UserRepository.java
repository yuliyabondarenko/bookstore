package com.nixsolutions.bondarenko.bookstore.repository;

import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
    boolean existsByEmail(@Param("email") String username);

    User findOneByEmail(@Param("email") String username);

    List<User> findByRoles(@Param("role") UserRole role);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(User user);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<User> findByRolesName(@Param("role") Role role, Pageable pageable);
}