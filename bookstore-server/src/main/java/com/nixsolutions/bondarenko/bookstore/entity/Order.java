package com.nixsolutions.bondarenko.bookstore.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_order")
public class Order
{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToMany
  private List<Book> books = new ArrayList<>();

  @ManyToOne(optional = false)
  private User user;

  public Order()
  {
  }

  public Order(List<Book> books, User user)
  {
    this.books = books;
    this.user = user;
  }

  public long getId()
  {
    return id;
  }

  public List<Book> getBooks()
  {
    return books;
  }

  public void setBooks(List<Book> books)
  {
    this.books = books;
  }

  public User getUser()
  {
    return user;
  }

  public void setUser(User user)
  {
    this.user = user;
  }
}
