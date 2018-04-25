package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OrderBookPrice implements Serializable {
  private static final long serialVersionUID = -6202609770901139946L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @ManyToOne(optional = false)
  private Order order;

  @ManyToOne(optional = false)
  private Book book;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false)
  private int count;
}
