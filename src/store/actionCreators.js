import * as ACTION from "./actions";
import createAction from "../components/helpers/function/createAction";

export const setCurrentTable = createAction(ACTION.SET_CURRENT_TABLE);

export const availableTablesFetch = createAction(ACTION.AVAILABLE_TABLES.fetch);
export const availableTablesStart = createAction(ACTION.AVAILABLE_TABLES.start);
export const availableTablesSuccess = createAction(ACTION.AVAILABLE_TABLES.success);
export const availableTablesError = createAction(ACTION.AVAILABLE_TABLES.error);

export const TablesDataFetch = createAction(ACTION.TABLES_DATA.fetch);
export const TablesDataStart = createAction(ACTION.TABLES_DATA.start);
export const TablesDataSuccess = createAction(ACTION.TABLES_DATA.success);
export const TablesDataError = createAction(ACTION.TABLES_DATA.error);