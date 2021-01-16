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
} from "./routes/table_data";

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
        tableName,
        keys,
      },
      mockOptions: {
        success: {
          type: 'success',
          text: "Данные успешно удалены",
        },
        delay: 1000,
      },
      success: resolve,
      error: reject,
    });
  });
}