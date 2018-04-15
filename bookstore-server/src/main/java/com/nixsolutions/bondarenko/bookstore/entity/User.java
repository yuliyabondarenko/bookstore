package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Pattern;

@Entity(name = "user_account")
public class User implements Serializable {
  private static final long serialVersionUID = -8521008567463876822L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToMany(fetch = FetchType.EAGER)
  private List<UserRole> roles = new ArrayList<>();

  @OneToMany(orphanRemoval = true, mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
  private List<ShoppingCartItem> shoppingCartItems = new ArrayList<>();

  @Pattern(regexp = "^[\\p{L}]+[\\p{L} .'-]*$",
      message = "Name should begin with letter and can contain only letters, dashes, dots, apostrophes or spaces.")
  @Column(nullable = false)
  private String username;

  @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
      message = "Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number")
  @Column(nullable = false)
  private String password;

  @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
      message = "Not a well-formed email address")
  @Column(unique = true, nullable = false)
  private String email;

  //TODO Add Date validation
  //TODO ? Change to string ?
  @Column(nullable = false)
  private String birthday;

  @Column(nullable = false)
  private String gender;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
      mappedBy = "user", orphanRemoval = true)
  private List<Order> orders;

  public long getId() {
    return id;
  }

  public List<UserRole> getRoles() {
    return roles;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getBirthday() {
    return birthday;
  }

  public void setBirthday(String birthday) {
    this.birthday = birthday;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }

  public List<ShoppingCartItem> getShoppingCartItems() {
    return shoppingCartItems;
  }

  public void setShoppingCartItems(List<ShoppingCartItem> shoppingCartItems) {
    this.shoppingCartItems = shoppingCartItems;
  }
}
