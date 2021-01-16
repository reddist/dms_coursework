create index trips_date on Trip(start_date);
create index free_carts on Cart(status);
create index free_horses on Horse(status);
create index products_owner on Product(client_id);