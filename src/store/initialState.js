const initialState = {
  app: {
    tables: {
      available_tables: [],
      data: {},
      data_loading: false,
      selected_rows: [],
    },
    current_table: "",
    loading: false,
    table_content_loading: false,
    loading_foreign_row: false,
    foreign_row: {},
  }
};

export default initialState;