package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

@Entity
@Table(name = "user_order")
public class Order implements Serializable
{
  private static final long serialVersionUID = -4304333239034772283L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private Date date;

  @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "order")
  private List<OrderBookPrice> orderBookPrices = new ArrayList<>();

  @ManyToOne(optional = false)
  private User user;

  @Formula("select sum(obp.price) from order_book_price obp where obp.order_id = id")
  private Double totalAmount;

  public Order()
  {
  }

  public Order(Date date, User user, List<OrderBookPrice> orderBookPrice)
  {
    this.date = date;
    this.user = user;
    this.orderBookPrices = orderBookPrice;
  }

  @PrePersist
  @PreUpdate
  public void updateBookPriceAssociation(){
    for(OrderBookPrice item : this.orderBookPrices){
      item.setOrder(this);
    }
  }

  public long getId()
  {
    return id;
  }

  public Date getDate()
  {
    return date;
  }

  public void setDate(Date date)
  {
    this.date = date;
  }

  public User getUser()
  {
    return user;
  }

  public void setUser(User user)
  {
    this.user = user;
  }

  public List<OrderBookPrice> getOrderBookPrices()
  {
    return orderBookPrices;
  }

  public void setOrderBookPrices(List<OrderBookPrice> orderBookPrices)
  {
    this.orderBookPrices = orderBookPrices;
  }

  public Double getTotalAmount()
  {
    return this.totalAmount;
  }
}
