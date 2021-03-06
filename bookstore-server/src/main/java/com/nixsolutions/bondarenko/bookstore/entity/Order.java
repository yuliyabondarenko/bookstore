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

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "user_order")
@Getter
@Setter
public class Order implements Serializable
{
  private static final long serialVersionUID = -4304333239034772283L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  private Date date;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
  private List<OrderBookPrice> orderBookPrices = new ArrayList<>();

  @ManyToOne(optional = false)
  private User user;

  @Formula(value = "(select sum(obp.price * obp.count) from order_book_price obp where obp.order_id = id)")
  private Double totalAmount;

  @PrePersist
  @PreUpdate
  public void updateBookPriceAssociation(){
    for(OrderBookPrice item : this.orderBookPrices){
      item.setOrder(this);
    }
  }
}
