const cart_data = {
  name: "cart",
  columns: [
    {
      title: "Capacity",
      dataIndex: "capacity",
      type: "integer",
    },
    {
      title: "Status",
      dataIndex: "status",
      type: "enum",
      available_values: [
        'available',
        'on a trip',
        'under maintenance'
      ]
    },
    {
      title: "Office_id",
      dataIndex: "office_id",
      type: "integer",
    },
  ],
  key: ["cart_id"],
  data: [],
};

module.exports = cart_data;