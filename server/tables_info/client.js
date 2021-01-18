const client_data = {
  name: "client",
  columns: [
    {
      title: "Client id",
      dataIndex: "client_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Name",
      dataIndex: "name",
      type: "string",
      width: 150,
      fixed: true,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      type: "string",
      width: 150,
      fixed: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      type: "string",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      type: "string",
    },
    {
      title: "Country",
      dataIndex: "country",
      type: "string",
    },
    {
      title: "city",
      dataIndex: "city",
      type: "string",
    },
    {
      title: "Address",
      dataIndex: "address",
      type: "string",
    },
  ],
  key: ["client_id"],
  data: [],
};

module.exports = client_data;