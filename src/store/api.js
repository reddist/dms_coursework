import ajax from "../components/helpers/function/ajax";
import {
  method as available_tables_method,
  path as available_tables_path
} from "./routes/available_tables";
import {
  method as table_data_method,
  path as table_data_path
} from "./routes/table_data";

export function loadAvailableTables() {
  return new Promise((resolve, reject) => {
    ajax({
      url: available_tables_path,
      method: available_tables_method,
      dataType: "json",
      data: {},
      mockOptions: {
        success: {
          available_tables: [
            "Table 1",
            "Table 2",
            "Table 3",
          ],
        },
        delay: 2000,
      },
      success: resolve,
      error: reject,
    });
  });
}

export function loadTableData(tableName) {
  return new Promise((resolve, reject) => {
    ajax({
      url: table_data_path,
      method: table_data_method,
      dataType: "json",
      data: {
        tableName
      },
      mockOptions: {
        success: {
          table_data: {
            name: tableName,
            columns: ["Number", "Fruit", "Table"],
            data: [
              {
                "Number": 10,
                "Fruit": "яблоко",
                "Table": tableName,
              },
              {
                "Number": 5,
                "Fruit": "груша",
                "Table": tableName,
              },
            ],
          }
        },
        delay: 2000,
      },
      success: resolve,
      error: reject,
    });
  });
}