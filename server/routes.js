const available_tables_route = require("../src/store/routes/available_tables");
const remove_rows_route = require("../src/store/routes/remove_rows");
const table_data_route = require("../src/store/routes/table_data");
const userController = require('./user.controller');

const available_tables = {
  path: available_tables_route.path,
  method: available_tables_route.method,
  function: userController.getAvailableTables
};

const remove_rows = {
  path: remove_rows_route.path,
  method: remove_rows_route.method,
  function: "removeRows"
};

const table_data = {
  path: table_data_route.path,
  method: table_data_route.method,
  function: userController.getTableData
};

module.exports = [
  available_tables,
  //remove_rows,
  table_data
];
