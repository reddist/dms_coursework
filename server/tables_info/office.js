const office_data = {
  name: "office",
  columns: [
    {
      title: "office_id",
      dataIndex: "office_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Country",
      dataIndex: "country",
      type: "string",
    },
    {
      title: "City",
      dataIndex: "city",
      type: "string",
    },
    {
      title: "Address",
      dataIndex: "address",
      type: "string",
    },
    {
      title: "Rent cost",
      dataIndex: "rent_cost",
      type: "integer",
    },
  ],
  key: ["office_id"],
  data: [],
};

module.exports = office_data;