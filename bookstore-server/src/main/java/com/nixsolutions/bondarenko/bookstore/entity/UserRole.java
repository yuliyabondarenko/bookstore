package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

@Entity
public class UserRole implements Serializable {
  private static final long serialVersionUID = -1382181341969756615L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @Enumerated(EnumType.STRING)
  @Column(unique = true, nullable = false)
  private Role name;

  public Role getName() {
    return name;
  }

  public void setName(Role role) {
    this.name = role;
  }
}
