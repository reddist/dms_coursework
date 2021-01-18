import createFetchActions from "../components/helpers/function/createFetchActions";

export const AVAILABLE_TABLES = createFetchActions("AVAILABLE_TABLES");

export const TABLES_DATA = createFetchActions("TABLES_DATA");

export const SET_CURRENT_TABLE = "SET_CURRENT_TABLE";

export const SET_SELECTED_ROWS = "SET_SELECTED_ROWS";

export const LOAD_FILTERED_DATA = "LOAD_FILTERED_DATA";

export const REMOVE_ROWS = "REMOVE_ROWS";

export const LOADING_TABLE_DATA = "LOADING_TABLE_DATA";

export const ADD_A_ROW = "ADD_A_ROW";

export const LOADING_TABLE_CONTENT = "LOADING_TABLE_CONTENT";

export const LOADING_FOREIGN_ROW = "LOADING_FOREIGN_ROW";

export const FETCH_FOREIGN_ROW = "FETCH_FOREIGN_ROW";

export const SET_FOREIGN_ROW_DATA = "SET_FOREIGN_ROW_DATA";