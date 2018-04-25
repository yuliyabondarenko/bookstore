package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Book implements Serializable {
  private static final long serialVersionUID = 5404904932186585449L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = true)
  private String photo;

  @Column(columnDefinition = "boolean default false", nullable = false)
  private boolean absent;

  @Column(nullable = false)
  private Double price;
}
