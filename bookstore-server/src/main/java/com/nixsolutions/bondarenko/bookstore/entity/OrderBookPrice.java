package com.nixsolutions.bondarenko.bookstore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class OrderBookPrice implements Serializable
{
  private static final long serialVersionUID = -6202609770901139946L;

  @Id
  @ManyToOne
  private Order order;

  @Id
  @ManyToOne
  private Book book;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private int count;

  public OrderBookPrice()
  {
  }

  public OrderBookPrice(Order order, Book book, Double price, int count)
  {
    this.order = order;
    this.book = book;
    this.price = price;
    this.count = count;
  }

  public Order getOrder()
  {
    return order;
  }

  public void setOrder(Order order)
  {
    this.order = order;
  }

  public Book getBook()
  {
    return book;
  }

  public void setBook(Book book)
  {
    this.book = book;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public int getCount()
  {
    return count;
  }

  public void setCount(int count)
  {
    this.count = count;
  }
}
