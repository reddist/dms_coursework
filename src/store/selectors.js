import { createSelector } from "reselect";
import { getIn } from "immutable";

export const selectAvailableTables = (state) =>
  getIn(state, ["app", "tables", "available_tables"], []);

export const selectCurrentTable = (state) =>
  getIn(state, ["app", "current_table"], []);

export const selectIsLoadingAvailableTables = (state) =>
  getIn(state, ["app", "loading"], false);

export const selectIsLoadingTableData = createSelector(
  selectIsLoadingAvailableTables,
  (state) => getIn(state, ["app", "tables", "data_loading"], false),
  (loading, loading_data) => loading || loading_data
)

export const selectTableDataByTableName = (tableName) => createSelector(
  (state) => getIn(state, ["app", "tables", "data", tableName], []),
  (tableData) => tableData
);

export const selectCurrentTableData = (state) => {
  const current_table = selectCurrentTable(state);
  return selectTableDataByTableName(current_table)(state);
}