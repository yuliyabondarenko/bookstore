package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "book_id"}))
@Getter
@Setter
public class ShoppingCartItem implements Serializable {

  private static final long serialVersionUID = -3056748216597896872L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @ManyToOne(optional = false)
  private User user;

  @ManyToOne(optional = false)
  private Book book;

  @Column(nullable = false)
  @Min(1)
  private int count;

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
