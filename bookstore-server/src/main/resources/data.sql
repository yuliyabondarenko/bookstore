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

INSERT INTO book (name, price, photo)
VALUES ('Юлий Алкин "Цена познания"', 12.3, 'http://urlid.ru/bao7');
INSERT INTO book (name, price, absent, photo)
VALUES ('Оноре де Бальзак "Тридцатилетняя женщина"', 10.2, true, 'http://urlid.ru/bao8');
INSERT INTO book (name, price, absent, photo)
VALUES ('Трейси Брайан "Оставьте брезгливость, съешьте лягушку!"', true, 17.4, 'http://urlid.ru/bao9');
INSERT INTO book (name, price, photo)
VALUES ('Рей Бредбери - "451 градус по Фаренгейту"', 53.34, 'http://urlid.ru/baoa');
INSERT INTO book (name, price, photo)
VALUES ('Оскар Уайльд - "Портрет Дориана Грея"', 54.4, 'http://urlid.ru/baob');
INSERT INTO book (name, price, photo)
VALUES ('Антуан Франсуа Прево "История кавалера де Грие и Манон Леско"', 11.44, 'http://urlid.ru/baoc');
INSERT INTO book (name, price, photo)
VALUES ('Владимир Набоков "Лолита"', 41.44, 'http://urlid.ru/baod');
INSERT INTO book (name, price, photo)
VALUES ('Виктор Гюго "Собор Парижской Богоматери"', 11.3, 'http://urlid.ru/baoe');
INSERT INTO book (name, price, photo)
VALUES ('Фарли Моуэт "Never cry wolf" (Не кричи: «Волки!»)"', 11.97, 'http://urlid.ru/baof');