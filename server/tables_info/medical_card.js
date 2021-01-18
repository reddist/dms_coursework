const medical_card_data = {
  name: "medical_card",
  columns: [
    {
      title: "Medical card id",
      dataIndex: "medical_card_id",
      type: "integer",
      width: 150,
      align: 'center',
    },
    {
      title: "Employee id",
      dataIndex: "employee_id",
      type: "integer",
      is_foreign: true,
      table_name: "employee",
    },
    {
      title: "Ensurance number",
      dataIndex: "ensurance_number",
      type: "string",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      type: "string",
    },
  ],
  key: ["medical_card_id"],
  data: [],
};

module.exports = medical_card_data;