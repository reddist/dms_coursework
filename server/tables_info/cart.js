const cart_data = {
  name: "cart",
  columns: [
    {
      title: "Cart id",
      dataIndex: "cart_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
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
      title: "Office id",
      dataIndex: "office_id",
      type: "integer",
      is_foreign: true,
      table_name: "office",
    },
  ],
  key: ["cart_id"],
  data: [],
};

module.exports = cart_data;