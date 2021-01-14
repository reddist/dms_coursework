const initialState = {
  app: {
    is_authorised: true,
    tables: {
      available_tables: [],
      data: {},
    },
    current_table: "",
    loading: true,
  }
};

export default initialState;