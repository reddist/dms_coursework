const cell_data = {
  name: "cell",
  columns: [
    {
      title: "Pick_up_point_id",
      dataIndex: "pick_up_point_id",
      type: "integer",
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
    },
  ],
  key: ["cell_id"],
  data: [],
};

module.exports = cell_data;