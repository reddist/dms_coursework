drop trigger if exists cell_was_added on cell cascade;
drop function if exists cell_was_added_function() cascade;
drop trigger if exists cell_was_updated on cell cascade;
drop function if exists cell_was_updated_function() cascade;
drop trigger if exists horse_was_updated on horse cascade;
drop function if exists horse_was_updated_function() cascade;
drop trigger if exists product_was_added on product cascade;
drop function if exists product_was_added_function() cascade;

drop table if exists Position cascade;
drop table if exists Office cascade;
drop table if exists Employee cascade;
drop table if exists Medical_Card cascade;
drop table if exists Employee_Horse cascade;
drop table if exists Cart cascade;
drop table if exists Horse cascade;
drop type if exists horse_status cascade;
drop type if exists cart_status cascade;
drop type if exists cell_status cascade;
drop table if exists Product cascade;
drop table if exists Trip cascade;
drop table if exists Client cascade;
drop table if exists Farm cascade;
drop table if exists Pick_Up_Point cascade;
drop table if exists Cell cascade;

drop function if exists get_cart_capacity(integer) cascade;
drop function if exists update_position(integer, integer) cascade;

drop index if exists trips_date;
drop index if exists free_carts;
drop index if exists free_horses;
drop index if exists products_owner;

