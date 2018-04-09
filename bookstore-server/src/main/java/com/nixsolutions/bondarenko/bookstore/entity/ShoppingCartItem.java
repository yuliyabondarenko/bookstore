package com.nixsolutions.bondarenko.bookstore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Min;

@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames={"user_id", "book_id"}))
public class ShoppingCartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne(optional = false)
  private User user;

  @ManyToOne(optional = false)
  private Book book;

  @Column(nullable = false)
  @Min(1)
  private int count;

  public ShoppingCartItem() {
  }

  public ShoppingCartItem(User user, Book book, int count) {
    this.user = user;
    this.book = book;
    this.count = count;
  }

  public long getId() {
    return id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Book getBook() {
    return book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public int getCount() {
    return count;
  }

  public void setCount(int count) {
    this.count = count;
  }
}
