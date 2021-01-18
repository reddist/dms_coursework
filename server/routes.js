const available_tables_route = require("../src/store/routes/available_tables");
const remove_rows_route = require("../src/store/routes/remove_rows");
const table_data_route = require("../src/store/routes/table_data");
const add_a_row_route = require("../src/store/routes/add_a_row");
const get_a_row_route = require("../src/store/routes/get_a_row");
const userController = require('./user.controller');

const available_tables = {
  path: available_tables_route.path,
  method: available_tables_route.method,
  function: userController.getAvailableTables
};

const remove_rows = {
  path: remove_rows_route.path,
  method: remove_rows_route.method,
  function: userController.removeRows
};

const table_data = {
  path: table_data_route.path,
  method: table_data_route.method,
  function: userController.getTableData
};

const add_a_row = {
  path: add_a_row_route.path,
  method: add_a_row_route.method,
  function: userController.addRow
};

const get_a_row = {
  path: get_a_row_route.path,
  method: get_a_row_route.method,
  function: userController.getRow
};

module.exports = [
  available_tables,
  remove_rows,
  table_data,
  add_a_row,
  get_a_row
];
