package com.nixsolutions.bondarenko.bookstore.repository;

import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long>
{
    List<UserRole> findByName(@Param("name") String name);
}