const position_data = {
  name: "position",
  columns: [
    {
      title: "Position id",
      dataIndex: "position_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Name",
      dataIndex: "name",
      type: "string",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      type: "integer",
    },
  ],
  key: ["position_id"],
  data: [],
};

module.exports = position_data;