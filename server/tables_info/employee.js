const employee_data = {
  name: "employee",
  columns: [
    {
      title: "Employee id",
      dataIndex: "employee_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Name",
      dataIndex: "name",
      type: "string",
      width: 150,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      type: "string",
      width: 150,
    },
    {
      title: "Hiring date",
      dataIndex: "hiring_date",
      type: "date",
    },
    {
      title: "Education",
      dataIndex: "education",
      type: "string",
    },
    {
      title: "Position id",
      dataIndex: "position_id",
      type: "integer",
      is_foreign: true,
      table_name: "position",
    },
    {
      title: "Office id",
      dataIndex: "office_id",
      type: "integer",
      is_foreign: true,
      table_name: "office",
    },
  ],
  key: ["employee_id"],
  data: [],
};

module.exports = employee_data;