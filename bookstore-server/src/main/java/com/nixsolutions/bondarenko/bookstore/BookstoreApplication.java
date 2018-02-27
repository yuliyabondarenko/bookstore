package com.nixsolutions.bondarenko.bookstore;

import javax.annotation.PostConstruct;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;
import com.nixsolutions.bondarenko.bookstore.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreApplication
{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}

	public @PostConstruct
	void init()
	{
    UserRole roleUser = userRoleRepository.save(new UserRole(1, "USER"));
    UserRole roleAdmin = userRoleRepository.save(new UserRole(2, "ADMIN"));

    User userUser = new User();
    userUser.setRole(roleUser);
    userUser.setUsername("user");
    userUser.setEmail("user@mail.ru");
    userUser.setPassword("Qwerty123");
    userUser.setBirthday("1991-01-10");
    userUser.setGender("FEMALE");

    userRepository.save(userUser);

    User userAdmin = new User();
    userAdmin.setRole(roleAdmin);
    userAdmin.setUsername("admin");
    userAdmin.setEmail("admin@mail.ru");
    userAdmin.setPassword("Qwerty123");
    userAdmin.setBirthday("1990-03-03");
    userAdmin.setGender("MALE");

    userRepository.save(userAdmin);
	}
}
