package com.nixsolutions.bondarenko.bookstore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Long>
{
    UserRole findOneByName(@Param("name") Role role);
}