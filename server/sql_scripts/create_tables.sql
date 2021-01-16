create table Position (
    position_id serial primary key,
    name varchar(50),
    salary integer
);

create table Office (
    office_id serial primary key,
    country varchar(32),
    city varchar(32),
    address text,
    rent_cost integer
);

create table Employee (
    employee_id serial primary key,
    name varchar(32),
    surname varchar(32),
    hiring_date date,
    education text,
    position_id int
        references Position(position_id)
        ON DELETE set null
        ON UPDATE cascade,
    office_id int
        references Office(office_id)
        ON DELETE set null
        ON UPDATE cascade
);

create table Medical_Card (
    medical_card_id serial primary key,
    ensurance_number varchar(11),
    description text,
    employee_id int,
    foreign key (employee_id)
        references Employee(employee_id)
        ON DELETE cascade
        ON UPDATE cascade
);

create type cart_status as ENUM ('available', 'on a trip', 'under maintenance');

create table Cart (
    cart_id serial primary key,
    capacity integer,
    status cart_status,
    office_id int,
    foreign key (office_id)
        references Office(office_id)
        ON DELETE set null
        ON UPDATE cascade
);

create type horse_status as ENUM ('available', 'on a trip', 'under care');

create table Horse (
    horse_id serial primary key,
    name text,
    status horse_status,
    last_care_date date,
    office_id int,
    foreign key (office_id)
        references Office(office_id)
        ON DELETE set null
        ON UPDATE cascade
);

create table Employee_Horse (
    horse_id integer not null
        references Horse(horse_id)
        on delete cascade
        ON UPDATE cascade,
    employee_id integer not null
        references Employee(employee_id)
        on delete cascade
        ON UPDATE cascade,
    primary key (horse_id, employee_id)
);

create function get_cart_capacity(integer) returns integer as $$
    begin
        if $1 IS NULL then
            return 0;
        end if;
        return (select capacity from cart where cart_id = $1);
    end;
    $$ language plpgsql;

create table Trip (
    trip_id serial primary key,
    start_date date,
    end_date date,
    departure_point text,
    arrival_point text,
    product_count integer CHECK (product_count <= get_cart_capacity(cart_id)),
    horse_id int
        references Horse(horse_id)
        ON DELETE set null
        ON UPDATE cascade,
    cart_id int
        references Cart(cart_id)
        ON DELETE set null
        ON UPDATE cascade
);

create table Farm (
    farm_id serial primary key,
    location text,
    name varchar(32)
);

create table Client (
    client_id serial primary key,
    name varchar(32),
    surname varchar(32),
    email varchar(32),
    phone_number varchar(32),
    country varchar(32),
    city varchar(32),
    address text
);

create table Pick_Up_Point (
    pick_up_point_id serial primary key,
    location text,
    number_of_cells integer,
    number_of_free_cells integer
);

create type cell_status as ENUM ('available', 'occupied', 'broken');

create table Cell (
    cell_id serial primary key,
    status cell_status,
    client_id int
        references Client(client_id)
        ON DELETE set null
        ON UPDATE cascade,
    pick_up_point_id int
        references Pick_Up_Point(pick_up_point_id)
        ON DELETE set null
        ON UPDATE cascade
);

create table Product (
    product_id serial primary key,
    type text,
    weight integer,
    size integer ARRAY[3],
    departure_date date,
    arrival_date date,
    production_date date,
    expiration_date date,
    client_id int
        references Client(client_id)
        ON DELETE cascade
        ON UPDATE cascade,
    pick_up_point_id int
        references Pick_Up_Point(pick_up_point_id)
        ON DELETE set null
        ON UPDATE cascade,
    farm_id int
        references Farm(farm_id)
        ON DELETE cascade
        ON UPDATE cascade,
    trip_id int
        references Trip(trip_id)
        ON DELETE set null
        ON UPDATE cascade
);