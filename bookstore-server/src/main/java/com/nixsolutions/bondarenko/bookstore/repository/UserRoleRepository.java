package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

@Repository
@RestResource(exported = false)
public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
  UserRole findOneByName(@Param("name") Role role);
}