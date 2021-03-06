INSERT INTO user_role (id, name)
VALUES (1, 'ADMIN'), (2, 'USER'), (3, 'CUSTOMER');

INSERT INTO user_account (id, username, password, email, birthday, gender)
VALUES (1, 'admin', 'Qwe123', 'admin@mail.ru', '2018-02-01', 'MALE');

INSERT INTO user_account_roles (user_account_id, roles_id)
VALUES (1, 1), (1, 2);

INSERT INTO user_account (id, username, password, email, birthday, gender)
VALUES (2, 'customer', 'Qwe123', 'customer@mail.ru', '2018-02-01', 'MALE');

INSERT INTO user_account_roles (user_account_id, roles_id)
VALUES (2, 2), (2, 3);

INSERT INTO user_account (id, username, password, email, birthday, gender)
VALUES (3, 'user', 'Qwe123', 'user@mail.ru', '2018-02-01', 'MALE');

INSERT INTO user_account_roles (user_account_id, roles_id)
VALUES (3, 2);


INSERT INTO user_account (id, username, password, email, birthday, gender)
VALUES (4, 'olya', 'Qwe123', 'olya@mail.ru', '2018-02-01', 'FEMALE');

INSERT INTO user_account_roles (user_account_id, roles_id)
VALUES (4, 2), (4, 3);

INSERT INTO book (id, name, price, photo)
VALUES (1, 'Юлий Алкин "Цена познания"', 12.3, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451050750l/8032162.jpg');
INSERT INTO book (id, name, price, absent, photo)
VALUES (2, 'Оноре де Бальзак "Тридцатилетняя женщина"', 10.2, true, 'http://irecommend.ru/sites/default/files/product-images/75276/ZtWWyVa21Kvl4bYJFfvg.jpg');
INSERT INTO book (id, name, price, absent, photo)
VALUES (3, 'Трейси Брайан "Оставьте брезгливость, съешьте лягушку!"',  17.4, true,'https://m.media-amazon.com/images/I/519QZN+rWwL.jpg');
INSERT INTO book (id, name, price, photo)
VALUES (4,  'Рей Бредбери - "451 градус по Фаренгейту"', 53.34, 'http://loveread.ec/img/photo_books/2039.jpg');
INSERT INTO book (id, name, price, photo)
VALUES (5, 'Оскар Уайльд - "Портрет Дориана Грея"', 54.4, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451050750l/8032162.jpg');
INSERT INTO book (id, name, price, photo)
VALUES (6, 'Антуан Франсуа Прево "История кавалера де Грие и Манон Леско"', 11.44, 'https://i.livelib.ru/boocover/1000025434/200/ea35/AntuanFransua_Prevo__Istoriya_kavalera_de_Grie_i_Manon_Lesko.jpg');
INSERT INTO book (id, name, price, photo)
VALUES (8, 'Виктор Гюго "Собор Парижской Богоматери"', 11.3, 'https://bookz.ru/pics/sobor-pa_507.jpg');
INSERT INTO book (id, name, price, photo)
VALUES (9, 'Фарли Моуэт "Never cry wolf" (Не кричи: «Волки!»)"', 11.97, 'https://i.livelib.ru/boocover/1000569470/200/b479/Farli_Mouet__Ne_krichi_volki.jpg');
