import ajax from "../components/helpers/function/ajax";
import {
  method as available_tables_method,
  path as available_tables_path
} from "./routes/available_tables";
import {
  method as table_data_method,
  path as table_data_path
} from "./routes/table_data";
import {
  method as remove_rows_method,
  path as remove_rows_path
} from "./routes/remove_rows";
import {
  method as add_a_row_method,
  path as add_a_row_path
} from "./routes/add_a_row";
import {
  method as get_a_row_method,
  path as get_a_row_path
} from "./routes/get_a_row";

const base_path = "http://localhost:4000";

export function loadAvailableTables() {
  return new Promise((resolve, reject) => {
    ajax({
      url: base_path + available_tables_path,
      method: available_tables_method,
      dataType: "json",
      data: {},
      success: resolve,
      error: reject,
    });
  });
}

export function loadTableData(tableName) {
  return new Promise((resolve, reject) => {
    ajax({
      url: base_path + table_data_path,
      method: table_data_method,
      dataType: "json",
      data: {
        table_name: tableName,
      },
      success: resolve,
      error: reject,
    });
  });
}

export function removeRows(tableName, keys) {
  return new Promise((resolve, reject) => {
    ajax({
      url: base_path + remove_rows_path,
      method: remove_rows_method,
      dataType: "json",
      data: {
        table_name: tableName,
        keys,
      },
      success: resolve,
      error: reject,
    });
  });
}

export function addRow(tableName, data) {
  return new Promise((resolve, reject) => {
    ajax({
      url: base_path + add_a_row_path,
      method: add_a_row_method,
      dataType: "json",
      data: {
        table_name: tableName,
        row_data: data,
      },
      success: resolve,
      error: reject,
    });
  });
}

export function getRow(tableName, key) {
  return new Promise((resolve, reject) => {
    ajax({
      url: base_path + get_a_row_path,
      method: get_a_row_method,
      dataType: "json",
      data: {
        table_name: tableName,
        key,
      },
      success: resolve,
      error: reject,
    });
  });
}