package com.nixsolutions.bondarenko.bookstore;

import java.util.Arrays;
import javax.annotation.PostConstruct;

import com.nixsolutions.bondarenko.bookstore.entity.Order;
import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import com.nixsolutions.bondarenko.bookstore.repository.OrderRepository;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;
import com.nixsolutions.bondarenko.bookstore.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nixsolutions.bondarenko.bookstore.entity.Book;
import com.nixsolutions.bondarenko.bookstore.repository.BookRepository;

@SpringBootApplication
public class BookstoreApplication
{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRoleRepository userRoleRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private OrderRepository orderRepository;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}

	public @PostConstruct
	void init()
	{
		UserRole roleUser = userRoleRepository.save(new UserRole(1, Role.USER));
		UserRole roleAdmin = userRoleRepository.save(new UserRole(2, Role.ADMIN));
		// -------------USERS--------------

		User userUser = new User();
		userUser.setRole(roleUser);
		userUser.setUsername("user");
		userUser.setEmail("user@mail.ru");
		userUser.setPassword("Qwerty123");
		userUser.setBirthday("1991-09-09");
		userUser.setGender("FEMALE");

		userRepository.save(userUser);

		User userAdmin = new User();
		userAdmin.setRole(roleAdmin);
		userAdmin.setUsername("admin");
		userAdmin.setEmail("admin@mail.ru");
		userAdmin.setPassword("Qwerty123");
		userAdmin.setBirthday("1991-09-09");
		userAdmin.setGender("MALE");

		userRepository.save(userAdmin);

		// -------------BOOKS--------------

    Book book1 = new Book();
    book1.setName("1984, George Orwell");
    book1.setPrice(13.55);

		bookRepository.save(book1);

		Book book2 = new Book();
    book2.setName("2984, George Orwell");
    book2.setPrice(23.55);

		bookRepository.save(book2);

		Book book3 = new Book();
    book3.setName("3984, George Orwell");
    book3.setPrice(33.55);

		bookRepository.save(book3);

		// -------------ORDERS--------------
		Order order1 = new Order();
		order1.setBooks(Arrays.asList(book1, book2));
		order1.setUser(userUser);
		orderRepository.save(order1);

		Order order2 = new Order();
		order2.setBooks(Arrays.asList(book1, book2, book3));
		order2.setUser(userUser);
		orderRepository.save(order2);

	}
}
