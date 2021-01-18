const product_data = {
  name: "product",
  columns: [
    {
      title: "Product id",
      dataIndex: "product_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Trip id",
      dataIndex: "trip_id",
      type: "integer",
      is_foreign: true,
      table_name: "trip",
    },
    {
      title: "Type",
      dataIndex: "type",
      type: "string",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      type: "integer",
    },
    {
      title: "Size",
      dataIndex: "size",
      type: "array",
      array_length: 3,
      array_type: "integer",
    },
    {
      title: "Departure date",
      dataIndex: "departure_date",
      type: "date",
    },
    {
      title: "Arrival date",
      dataIndex: "arrival_date",
      type: "date",
    },
    {
      title: "Production date",
      dataIndex: "production_date",
      type: "date",
    },
    {
      title: "Expiration date",
      dataIndex: "expiration_date",
      type: "date",
    },
    {
      title: "Client id",
      dataIndex: "client_id",
      type: "integer",
      is_foreign: true,
      table_name: "client",
    },
    {
      title: "Pick-Up Point id",
      dataIndex: "pick_up_point_id",
      type: "integer",
      is_foreign: true,
      table_name: "pick_up_point",
    },
    {
      title: "Farm id",
      dataIndex: "farm_id",
      type: "integer",
      is_foreign: true,
      table_name: "farm",
    },
  ],
  key: ["product_id"],
  scroll: { x: 1300 },
  data: [],
};

module.exports = product_data;