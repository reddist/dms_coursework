insert into position (
    name, salary
) values ('Руководитель отдела обеспечения лошадей', 80000);
insert into position (
    name, salary
) values ('Исполнительный директор', 130000);
insert into position (
    name, salary
) values ('Всадник', 35000);
insert into position (
    name, salary
) values ('Работник call-центра', 30000);
insert into position (
    name, salary
) values ('Офис-менеджер', 40000);
insert into position (
    name, salary
) values ('Менеджер по продажам', 65000);
insert into position (
    name, salary
) values ('Маркетолог', 56000);

insert into office (
    country, city, address, rent_cost
) VALUES (
    'Россия', 'Санкт-Петербург', '1-ая Конюшенная, 28', 300000
 );
insert into office (
    country, city, address, rent_cost
) VALUES (
    'Россия', 'Санкт-Петербург', 'Чкаловский проспект, 50', 220000
);
insert into office (
    country, city, address, rent_cost
) VALUES (
    'Россия', 'Санкт-Петербург', 'Лиговский проспект, 43', 195000
);

insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Иван', 'Андреев',
    '2020-11-25', 'Неполное высшее',
    1, 2
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Андрей', 'Иванов',
    '2018-01-18', 'Высшее',
    2, 1
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Василий', 'Карпов',
    '2019-04-13', 'Среднее образование',
    3, 3
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Александр', 'Верещагин',
    '2020-07-17', 'Среднее образование',
    3, 1
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Варвара', 'Полыгалова',
    '2020-09-04', 'Высшее образование',
    4, 1
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Анастасия', 'Петрова',
    '2020-08-26', 'Высшее образование',
    4, 2
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Петр', 'Казаков',
    '2020-04-17', 'Высшее образование',
    5, 3
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Ли', 'Хуань',
    '2019-11-11', 'Высшее образование',
    6, 2
);
insert into employee (
    name, surname,
    hiring_date, education,
    position_id, office_id
) values (
    'Маргарита', 'Макеева',
    '2020-05-27', 'Высшее образование',
    7, 2
);

insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Авель', 'available', '2020-11-27', 1
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Август', 'available', '2020-11-27', 1
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Билли', 'on a trip', '2020-11-27', 1
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Дантес', 'under care', '2020-11-27', 1
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Абсент', 'available', '2020-11-27', 2
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Джейк', 'on a trip', '2020-11-27', 2
);

insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Жасмин', 'on a trip', '2020-11-27', 2
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Оазис', 'on a trip', '2020-11-27', 2
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Бемби', 'available', '2020-11-27', 3
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Женева', 'on a trip', '2020-11-27', 3
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Танго', 'under care', '2020-11-27', 3
);
insert into horse (
    name, status, last_care_date, office_id
) VALUES (
    'Якорь', 'under care', '2020-11-27', 3
);

insert into employee_horse (
    horse_id, employee_id
) VALUES (1, 1);
insert into employee_horse (
    horse_id, employee_id
) VALUES (2, 1);
insert into employee_horse (
    horse_id, employee_id
) VALUES (3, 1);
insert into employee_horse (
    horse_id, employee_id
) VALUES (4, 1);
insert into employee_horse (
    horse_id, employee_id
) VALUES (5, 3);
insert into employee_horse (
    horse_id, employee_id
) VALUES (6, 3);
insert into employee_horse (
    horse_id, employee_id
) VALUES (7, 3);
insert into employee_horse (
    horse_id, employee_id
) VALUES (8, 3);
insert into employee_horse (
    horse_id, employee_id
) VALUES (9, 4);
insert into employee_horse (
    horse_id, employee_id
) VALUES (10, 4);
insert into employee_horse (
    horse_id, employee_id
) VALUES (11, 4);
insert into employee_horse (
    horse_id, employee_id
) VALUES (12, 4);

insert into client (
    name, surname, email, phone_number, country, city, address
) values (
    'Иван', 'Алмазогоров',
    'iamdiamond@gmail.com', '89072364717',
    'Россия', 'Санкт-Петербург',
    'ул. Горная, 23'
);
insert into client (
    name, surname, email, phone_number, country, city, address
) values (
    'Олег', 'Латыев',
    'oleglatyev@gmail.com', '89072775345',
    'Россия', 'Санкт-Петербург',
    'ул. Восстания, 33'
);
insert into client (
    name, surname, email, phone_number, country, city, address
) values (
    'Александр', 'Пигин',
    'pigin1975@gmail.com', '89257395123',
    'Россия', 'Санкт-Петербург',
    'ул. Седова, 70'
);
insert into client (
    name, surname, email, phone_number, country, city, address
) values (
    'Марина', 'Таланова',
    'talanovamary@gmail.com', '89617094563',
    'Россия', 'Санкт-Петербург',
    'ул. Крыленко, 8'
);
insert into client (
    name, surname, email, phone_number, country, city, address
) values (
    'Наталья', 'Горохова',
    'gorokhovanata1994@gmail.com', '89079674571',
    'Россия', 'Санкт-Петербург',
    'ул. Ленина, 42'
);

insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Солнечная, 25', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Богословская, 4', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Абрамова, 16', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Наличная, 49', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Туристская, 23', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Гончарная, 15', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Центральная, 4', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Новокузнецкая, 42', 0, 0
);
insert into pick_up_point (
    location, number_of_cells, number_of_free_cells
) VALUES (
    'ул. Митинская, 27', 0, 0
);

insert into cell (
    status, client_id, pick_up_point_id
) values (
    'occupied', 1, 1
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 1
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 1
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 1
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'occupied', 2, 3
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 2
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 2
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 2
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'occupied', 3, 4
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 3
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 3
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 3
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 3
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'occupied', 4, 7
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 4
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 4
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 4
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 4
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'occupied', 5, 9
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 5
);
insert into cell (
    status, client_id, pick_up_point_id
) values (
    'available', null, 5
);

insert into cart (capacity, status, office_id) VALUES (
    8, 'available', 1
);
insert into cart (capacity, status, office_id) VALUES (
    10, 'available', 1
);
insert into cart (capacity, status, office_id) VALUES (
    20, 'available', 2
);
insert into cart (capacity, status, office_id) VALUES (
    25, 'available', 2
);
insert into cart (capacity, status, office_id) VALUES (
    15, 'available', 2
);
insert into cart (capacity, status, office_id) VALUES (
    10, 'available', 3
);
insert into cart (capacity, status, office_id) VALUES (
    8, 'available', 3
);
insert into cart (capacity, status, office_id) VALUES (
    15, 'available', 3
);
insert into cart (capacity, status, office_id) VALUES (
    21, 'available', 3
);

insert into trip (
    start_date,
    end_date,
    departure_point,
    arrival_point,
    product_count,
    horse_id,
    cart_id
) VALUES (
    '2020-12-03', '2020-12-03',
    '1-ая Конюшенная, 28',
    'Большая Садовая, д.18', 0, 1, 1
);

insert into trip (
    start_date,
    end_date,
    departure_point,
    arrival_point,
    product_count,
    horse_id,
    cart_id
) VALUES (
    '2020-08-02', '2020-08-02',
    '1-ая Конюшенная, 28',
    'Большая Садовая, д.18', 0, 1, 1
);

insert into farm (location, name) values (
    'Пос. Иванушкин, д. 13', 'Любава'
);

insert into product (
    type,
    weight,
    size,
    departure_date,
    arrival_date,
    production_date,
    expiration_date,
    client_id,
    pick_up_point_id,
    farm_id, trip_id
) VALUES (
    'Молоко, 1 л., 20 шт.', 20000,
    '{30, 40, 50}', '2020-08-14 13:00',
    '2020-08-15 15:00',
    '2020-08-14',
    '2020-08-20',
    1,
    1,
    1, 1
);

insert into product (
    type,
    weight,
    size,
    departure_date,
    arrival_date,
    production_date,
    expiration_date,
    client_id,
    pick_up_point_id,
    farm_id, trip_id
) VALUES (
    'Мясо, 30 кг', 30000,
    '{100, 100, 200}', '2020-08-02',
    '2020-08-02',
    '2020-08-01',
    '2020-08-05',
    1,
    1,
    1, 2
);

insert into trip (
    start_date,
    end_date,
    departure_point,
    arrival_point,
    product_count,
    horse_id,
    cart_id
) VALUES (
    '2020-07-02', '2020-07-02',
    '1-ая Конюшенная, 28',
    'Большая Садовая, д.18', 0, 1, 1
);

insert into product (
    type,
    weight,
    size,
    departure_date,
    arrival_date,
    production_date,
    expiration_date,
    client_id,
    pick_up_point_id,
    farm_id, trip_id
) VALUES (
    'Мясо, 30 кг', 30000,
    '{100, 100, 200}', '2020-07-02',
    '2020-07-02',
    '2020-07-01',
    '2020-07-05',
    1,
    1,
    1, 3
);

insert into trip (
    start_date,
    end_date,
    departure_point,
    arrival_point,
    product_count,
    horse_id,
    cart_id
) VALUES (
    '2020-07-02', '2020-07-02',
    '1-ая Конюшенная, 28',
    'Большая Садовая, д.18', 0, 2, 1
);