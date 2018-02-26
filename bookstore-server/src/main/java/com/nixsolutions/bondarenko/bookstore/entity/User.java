package com.nixsolutions.bondarenko.bookstore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Pattern(regexp = "^[a-zA-Z](([._-][a-zA-Z0-9])|[a-zA-Z0-9]){2,14}$",
            message = "3-15 characters, beginning with letter. Can include letters, numbers, dashes, and underscores")
    @Column(unique = true, nullable = false)
    private String username;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
            message = "Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number")
    @Column(nullable = false)
    private String password;

    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
            message = "Not a well-formed email address")
    @Column(unique = true, nullable = false)
    private String email;

    //TODO Add Date validation
    //TODO ? Change to string ?
    @Past
    @Column(nullable = false)
    private Date birthday;

    @Column(nullable = false)
    private String gender;


    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}