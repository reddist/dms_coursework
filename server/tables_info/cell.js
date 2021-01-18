const cell_data = {
  name: "cell",
  columns: [
    {
      title: "cell_id",
      dataIndex: "cell_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Pick_up_point_id",
      dataIndex: "pick_up_point_id",
      type: "integer",
      is_foreign: true,
      table_name: "pick_up_point",
    },
    {
      title: "Status",
      dataIndex: "status",
      type: "enum",
      available_values: [
        'available',
        'occupied',
        'broken'
      ]
    },
    {
      title: "Client_id",
      dataIndex: "client_id",
      type: "integer",
      is_foreign: true,
      table_name: "client",
    },
  ],
  key: ["cell_id"],
  data: [],
};

module.exports = cell_data;