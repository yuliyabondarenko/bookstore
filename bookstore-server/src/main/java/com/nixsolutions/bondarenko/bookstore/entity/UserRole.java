package com.nixsolutions.bondarenko.bookstore.entity;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserRole
{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Enumerated(EnumType.STRING)
  @Column(unique = true, nullable = false)
  private Role name;

  public UserRole()
  {
  }

  public UserRole(long id, Role role)
  {
    this.id = id;
    this.name = role;
  }

  public Role getName()
  {
    return name;
  }

  public void setName(Role role)
  {
    this.name = role;
  }
}
