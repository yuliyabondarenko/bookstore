package com.nixsolutions.bondarenko.bookstore.model;

import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;

import java.util.List;

public class UserData {
  private Long userId;
  private String userName;
  private List<Role> roles;

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

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
