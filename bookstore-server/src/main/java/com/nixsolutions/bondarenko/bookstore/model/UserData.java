package com.nixsolutions.bondarenko.bookstore.model;

import java.util.List;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

public class UserData {
  private String userName;
  private List<Role> roles;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public List<Role> getRoles() {
    return roles;
  }

  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }
}
