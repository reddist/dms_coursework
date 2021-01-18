import { createSelector } from "reselect";
import { getIn } from "immutable";

export const selectAvailableTables = (state) =>
  getIn(state, ["app", "tables", "available_tables"], []);

export const selectNameOfCurrentTable = (state) =>
  getIn(state, ["app", "current_table"], []);

export const selectIsLoadingAvailableTables = (state) =>
  getIn(state, ["app", "loading"], false);

export const selectIsLoadingTableData = createSelector(
  selectIsLoadingAvailableTables,
  (state) => getIn(state, ["app", "tables", "data_loading"], false),
  (loading, loading_data) => loading || loading_data
);

export const selectIsLoadingTableContent = (state) =>
  getIn(state, ["app", "table_content_loading"], false);

export const selectIsLoadingForeignRow = (state) =>
  getIn(state, ["app", "loading_foreign_row"], false);

export const selectIsLoadingActionButtons = createSelector(
  selectIsLoadingTableData,
  selectIsLoadingTableContent,
  (loadingTableData, loadingTableContent) => loadingTableData || loadingTableContent
);

export const selectTableDataByTableName = (tableName) => createSelector(
  (state) => getIn(state, ["app", "tables", "data", `${tableName}`], []),
  (tableData) => tableData
);

export const selectCurrentTableData = (state) => {
  const current_table = selectNameOfCurrentTable(state);
  return selectTableDataByTableName(current_table)(state);
}

export const selectSelectedRows = (state) =>
  getIn(state, ["app", "tables", "selected_rows"], []);

export const selectFilteredData = (tableName) => createSelector(
  selectSelectedRows,
  selectTableDataByTableName(tableName),
  (selected_rows_nums, table_data) => {
    return table_data["data"].filter(item =>
      selected_rows_nums.includes(item["key"])
    );
  }
);

export const selectForeignRowData = (state) =>
  getIn(state, ["app", "foreign_row"], {});