const horse_data = {
  name: "horse",
  columns: [
    {
      title: "horse_id",
      dataIndex: "horse_id",
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
      title: "Status",
      dataIndex: "status",
      type: "enum",
      available_values: [
        'available',
        'on a trip',
        'under care'
      ]
    },
    {
      title: "Last care date",
      dataIndex: "last_care_date",
      type: "date",
    },
    {
      title: "Office_id",
      dataIndex: "office_id",
      type: "integer",
      is_foreign: true,
      table_name: "office",
    },
  ],
  key: ["horse_id"],
  data: [],
};

module.exports = horse_data;