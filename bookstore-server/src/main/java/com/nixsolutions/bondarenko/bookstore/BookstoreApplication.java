package com.nixsolutions.bondarenko.bookstore;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.annotation.PostConstruct;

import com.nixsolutions.bondarenko.bookstore.entity.ShoppingCartItem;
import com.nixsolutions.bondarenko.bookstore.entity.Order;
import com.nixsolutions.bondarenko.bookstore.entity.OrderBookPrice;
import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.entity.UserRole;
import com.nixsolutions.bondarenko.bookstore.entity.enums.Role;
import com.nixsolutions.bondarenko.bookstore.repository.ShoppingCartRepository;
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
	@Autowired
	private ShoppingCartRepository cartRepository;

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
		userUser.getRoles().add(roleUser);
		userUser.setUsername("user");
		userUser.setEmail("user@mail.ru");
		userUser.setPassword("Qwerty123");
		userUser.setBirthday("1991-09-09");
		userUser.setGender("FEMALE");

		userRepository.save(userUser);

		User userAdmin = new User();
		userAdmin.getRoles().add(roleUser);
		userAdmin.getRoles().add(roleAdmin);
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
		Date date1 = new GregorianCalendar(2017, 3, 11, 17, 9, 8).getTime();
		Date date2 = new GregorianCalendar(2017, 3, 12, 23, 56, 34).getTime();

		Order order1 = new Order();
		order1.setUser(userUser);
		order1.setDate(date1);

		OrderBookPrice orderBookPrice1 = new OrderBookPrice(order1, book1, book1.getPrice(), 1);
		OrderBookPrice orderBookPrice2 = new OrderBookPrice(order1, book2, book2.getPrice(), 2);

		order1.getOrderBookPrices().add(orderBookPrice1);
		order1.getOrderBookPrices().add(orderBookPrice2);

		orderRepository.save(order1);

		Order order2 = new Order();
		order2.setUser(userUser);
		order2.setDate(date2);

		OrderBookPrice orderBookPrice3 = new OrderBookPrice(order2, book1, book1.getPrice(), 1);
		OrderBookPrice orderBookPrice4 = new OrderBookPrice(order2, book2, book2.getPrice(), 2);
		OrderBookPrice orderBookPrice5 = new OrderBookPrice(order2, book3, book3.getPrice(), 3);
		order2.getOrderBookPrices().add(orderBookPrice3);
		order2.getOrderBookPrices().add(orderBookPrice4);
		order2.getOrderBookPrices().add(orderBookPrice5);

		orderRepository.save(order2);


    //SHOPPING CART

    ShoppingCartItem cart1 = new ShoppingCartItem(userUser, book1, 11);
    cartRepository.save(cart1);
    ShoppingCartItem cart2 = new ShoppingCartItem(userUser, book2, 12);
    cartRepository.save(cart2);
    ShoppingCartItem cart3 = new ShoppingCartItem(userUser, book3, 3);
    cartRepository.save(cart3);

    ShoppingCartItem cart4 = new ShoppingCartItem(userAdmin, book1, 5);
    cartRepository.save(cart4);
    ShoppingCartItem cart5 = new ShoppingCartItem(userAdmin, book3, 4);
    cartRepository.save(cart5);

    List<ShoppingCartItem> userCarts = cartRepository.findByUser(userUser);
    List<ShoppingCartItem> adminCarts = cartRepository.findByUser(userAdmin);
  }
}
