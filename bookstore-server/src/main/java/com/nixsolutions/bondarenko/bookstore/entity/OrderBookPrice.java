package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class OrderBookPrice implements Serializable {
  private static final long serialVersionUID = -6202609770901139946L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @ManyToOne
  private Order order;

  @ManyToOne
  private Book book;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private int count;

  public OrderBookPrice() {
  }

  public OrderBookPrice(Order order, Book book, Double price, int count) {
    this.order = order;
    this.book = book;
    this.price = price;
    this.count = count;
  }

  public long getId() {
    return id;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Book getBook() {
    return book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public int getCount() {
    return count;
  }

  public void setCount(int count) {
    this.count = count;
  }
}
