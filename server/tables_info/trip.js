const trip_data = {
  name: "trip",
  columns: [
    {
      title: "Trip id",
      dataIndex: "trip_id",
      type: "integer",
      width: 100,
      align: 'center',
    },
    {
      title: "Horse id",
      dataIndex: "horse_id",
      type: "integer",
      width: 100,
      is_foreign: true,
      table_name: "horse",
    },
    {
      title: "Cart id",
      dataIndex: "cart_id",
      type: "integer",
      width: 100,
      is_foreign: true,
      table_name: "cart",
    },
    {
      title: "Product count",
      dataIndex: "product_count",
      type: "integer",
      width: 100,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      type: "date",
    },
    {
      title: "End date",
      dataIndex: "end_date",
      type: "date",
    },
    {
      title: "Departure point",
      dataIndex: "departure_point",
      type: "string",
    },
    {
      title: "Arrival point",
      dataIndex: "arrival_point",
      type: "string",
    },
  ],
  key: ["trip_id"],
  scroll: { x: 1100 },
  data: [],
};

module.exports = trip_data;