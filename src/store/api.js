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

const createMockTableData = (tableName, num) => {
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push({
      key: i * 2 + 1,
      number: 10,
      fruit: "яблоко",
      table: tableName,
    });
    result.push({
      key: i * 2 + 2,
      number: 5,
      fruit: "груша",
      table: tableName,
    });
  }
  return result;
};

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
            columns: [
              {
                title: "Number",
                dataIndex: "number",
                type: "integer",
              },
              {
                title: "Fruit",
                dataIndex: "fruit",
                type: "string",
              },
              {
                title: "Table",
                dataIndex: "table",
                type: "string",
              }
            ],
            data: createMockTableData(tableName, tableName === "Table 1"
              ? 6
              : tableName === "Table 2"
                ? 0
                : 2
            )
          }
        },
        delay: 2000,
      },
      success: resolve,
      error: reject,
    });
  });
}

export function removeRows(tableName, keys) {
  return new Promise((resolve, reject) => {
    ajax({
      url: remove_rows_path,
      method: remove_rows_method,
      dataType: "json",
      data: {
        tableName,
        keys,
      },
      mockOptions: {
        success: {
          table_data: {
            name: tableName,
            columns: [
              {
                title: "Number",
                dataIndex: "number",
              },
              {
                title: "Fruit",
                dataIndex: "fruit",
              },
              {
                title: "Table",
                dataIndex: "table",
              }
            ],
            data: createMockTableData(tableName, tableName === "Table 1"
              ? 5
              : tableName === "Table 2"
                ? 0
                : 1
            )
          }
        },
        delay: 1000,
      },
      success: resolve,
      error: reject,
    });
  });
}