const farm_data = {
  name: "farm",
  columns: [
    {
      title: "farm_id",
      dataIndex: "farm_id",
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
      title: "Location",
      dataIndex: "location",
      type: "string",
    },
  ],
  key: ["farm_id"],
  data: [],
};

module.exports = farm_data;