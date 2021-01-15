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
  }
};

export default initialState;