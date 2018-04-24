package com.nixsolutions.bondarenko.bookstore.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
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

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }

  public boolean isAbsent() {
    return absent;
  }

  public void setAbsent(boolean absent) {
    this.absent = absent;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }
}
