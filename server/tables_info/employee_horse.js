const employee_horse_data = {
  name: "employee_horse",
  columns: [
    {
      title: "horse_id",
      dataIndex: "horse_id",
      type: "integer",
      is_foreign: true,
      table_name: "horse",
    },
    {
      title: "employee_id",
      dataIndex: "employee_id",
      type: "integer",
      is_foreign: true,
      table_name: "employee",
    },
  ],
  key: ["horse_id", "employee_id"],
  data: [],
};

module.exports = employee_horse_data;