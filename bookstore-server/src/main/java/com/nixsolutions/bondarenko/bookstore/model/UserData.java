package com.nixsolutions.bondarenko.bookstore.model;

import java.util.List;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserData {
  private String userName;
  private List<Role> roles;
}
