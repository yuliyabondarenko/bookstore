package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long>
{
    UserRole findOneByName(@Param("name") Role role);
}