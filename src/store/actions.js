import createFetchActions from "../components/helpers/function/createFetchActions";

export const AVAILABLE_TABLES = createFetchActions("AVAILABLE_TABLES");

export const TABLES_DATA = createFetchActions("TABLES_DATA");

export const SET_CURRENT_TABLE = "SET_CURRENT_TABLE";

export const SET_SELECTED_ROWS = "SET_SELECTED_ROWS";

export const LOAD_FILTERED_DATA = "LOAD_FILTERED_DATA";

export const REMOVE_ROWS = "REMOVE_ROWS";

export const LOADING_TABLE_DATA = "LOADING_TABLE_DATA";