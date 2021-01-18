create function cell_was_added_function()
    returns trigger as $cell_was_added_function$
    BEGIN
        UPDATE pick_up_point
            SET number_of_cells = number_of_cells + 1
            WHERE pick_up_point_id = NEW.pick_up_point_id;
        UPDATE pick_up_point
            SET number_of_free_cells = number_of_free_cells + 1
            WHERE pick_up_point_id = NEW.pick_up_point_id
                AND NEW.status = 'available';
        RETURN new;
    END;
    $cell_was_added_function$ LANGUAGE plpgsql;

create trigger cell_was_added
    after INSERT on cell
    for each row execute procedure cell_was_added_function();

create function cell_was_deleted_function()
    returns trigger as $$
BEGIN
    UPDATE pick_up_point
        SET number_of_cells = number_of_cells - 1
        WHERE pick_up_point_id = OLD.pick_up_point_id;
    UPDATE pick_up_point
        SET number_of_free_cells = number_of_free_cells - 1
        WHERE pick_up_point_id = OLD.pick_up_point_id
            AND OLD.status = 'available';
    RETURN old;
END;
$$ LANGUAGE plpgsql;

create trigger cell_was_deleted
    after DELETE on cell
    for each row execute procedure cell_was_deleted_function();

create function cell_was_updated_function()
    returns trigger as $cell_was_updated_function$
    BEGIN
        UPDATE pick_up_point
            SET number_of_free_cells = number_of_free_cells - 1
            WHERE pick_up_point_id = NEW.pick_up_point_id
                AND OLD.status = 'available'
                AND NEW.status != 'available';
        UPDATE pick_up_point
            SET number_of_free_cells = number_of_free_cells + 1
            WHERE pick_up_point_id = NEW.pick_up_point_id
                AND OLD.status != 'available'
                AND NEW.status = 'available';
        RETURN new;
    END;
    $cell_was_updated_function$ LANGUAGE plpgsql;

create trigger cell_was_updated
    after UPDATE of status on cell
    for each row execute procedure cell_was_updated_function();


create function product_was_added_function()
    returns trigger as $product_was_added_function$
    BEGIN
        UPDATE trip
            SET product_count = product_count + 1
            WHERE trip_id = new.trip_id;
        RETURN new;
    END;
    $product_was_added_function$ LANGUAGE plpgsql;

create trigger product_was_added
    after INSERT on product
    for each row execute procedure product_was_added_function();

create function horse_was_updated_function()
    returns trigger as $horse_was_updated_function$
    BEGIN
        UPDATE horse
            SET last_care_date = CURRENT_DATE
            WHERE horse_id = NEW.horse_id
                AND OLD.status = 'under care'
                AND NEW.status != 'under care';
        RETURN new;
    END;
    $horse_was_updated_function$ LANGUAGE plpgsql;

create trigger horse_was_updated
    after update of status on horse
    for each row execute procedure horse_was_updated_function();


create function update_position(
    in our_employee_id integer,
    in new_position_id integer
) returns text as $$
    begin
        update employee
            set position_id = new_position_id
            where employee_id = our_employee_id;
        return 'Успешно';
    end;
    $$ LANGUAGE plpgsql;