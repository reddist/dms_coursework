const pick_up_point_data = {
  name: "pick_up_point",
  columns: [
    {
      title: "Pick-Up Point id",
      dataIndex: "pick_up_point_id",
      type: "integer",
      width: 150,
      align: 'center',
    },
    {
      title: "Number of free cells",
      dataIndex: "number_of_free_cells",
      type: "integer",
    },
    {
      title: "Number of cells",
      dataIndex: "number_of_cells",
      type: "integer",
    },
    {
      title: "Location",
      dataIndex: "location",
      type: "string",
    },
  ],
  key: ["pick_up_point_id"],
  data: [],
};

module.exports = pick_up_point_data;